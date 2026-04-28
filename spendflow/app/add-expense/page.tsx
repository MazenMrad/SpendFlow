"use client";

import { useState, useRef } from 'react';
import Layout from '../components/Layout';
import { addExpense, getUserCategories } from '../actions/expenses';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Tesseract from 'tesseract.js';

export default function AddExpense() {
  const [formData, setFormData] = useState({
    date: '',
    amount: '',
    category: '',
    type: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<{ id: string, name: string }[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [ocrText, setOcrText] = useState('');
  const [isOcrProcessing, setIsOcrProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
	async function loadCategories() {
		const userCats = await getUserCategories();
		const defaults = ["Transport", "Food", "Entertainment", "Shopping"];

		const uniqueCats = new Map();
		defaults.forEach(name => uniqueCats.set(name, { id: name, name }));
		userCats.forEach(cat => uniqueCats.set(cat.name, cat));

      setCategories(Array.from(uniqueCats.values()));
    }
    loadCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const formDataObj = new FormData();
    formDataObj.append('date', formData.date);
    formDataObj.append('amount', formData.amount);
    formDataObj.append('category', formData.category);
    formDataObj.append('type', formData.type);
    formDataObj.append('description', formData.description);

    const result = await addExpense(formDataObj);

    setIsLoading(false);

    if (result.error) {
      setMessage({ type: 'error', text: result.error });
    } else {
      setMessage({ type: 'success', text: result.message || 'Expense added successfully!' });
      setFormData({
        date: '',
        amount: '',
        category: '',
        type: '',
        description: '',
      });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsOcrProcessing(true);

    try {
      const result = await Tesseract.recognize(file, 'eng', {
        logger: (m) => console.log(m),
      });

      const text = result.data.text;
      setOcrText(text);
      parseOcrText(text);
    } catch (error) {
      console.error('OCR Error:', error);
      setMessage({ type: 'error', text: 'Failed to process image' });
    } finally {
      setIsOcrProcessing(false);
    }
  };

  const parseOcrText = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim());
    const amountRegex = /\$?\d+\.\d{2}/;
    const dateRegex = /(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})|(\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2})/;

    const categoryKeywords: Record<string, string> = {
      'grocery': 'Food',
      'food': 'Food',
      'restaurant': 'Food',
      'cafe': 'Food',
      'coffee': 'Food',
      'uber': 'Transport',
      'lyft': 'Transport',
      'gas': 'Transport',
      'fuel': 'Transport',
      'parking': 'Transport',
      'transport': 'Transport',
      'movie': 'Entertainment',
      'netflix': 'Entertainment',
      'spotify': 'Entertainment',
      'game': 'Entertainment',
      'amazon': 'Shopping',
      'store': 'Shopping',
      'walmart': 'Shopping',
      'target': 'Shopping',
    };

    const typeKeywords: Record<string, string> = {
      'visa': 'Card',
      'mastercard': 'Card',
      'amex': 'Card',
      'credit': 'Card',
      'debit': 'Card',
      'card': 'Card',
      'cash': 'Cash',
      'check': 'Check',
    };

    let amount = '';
    let date = '';
    let category = '';
    let type = '';
    let description = lines.slice(0, 2).join(' ').slice(0, 100);

    for (const line of lines) {
      const amountMatch = line.match(amountRegex);
      if (amountMatch && !amount) {
        amount = amountMatch[0].replace('$', '');
      }

      const dateMatch = line.match(dateRegex);
      if (dateMatch && !date) {
        try {
          const parsed = new Date(dateMatch[0]);
          if (!isNaN(parsed.getTime())) {
            date = parsed.toISOString().split('T')[0];
          }
        } catch {
          date = dateMatch[0];
        }
      }

      const lowerLine = line.toLowerCase();
      for (const [keyword, cat] of Object.entries(categoryKeywords)) {
        if (lowerLine.includes(keyword) && !category) {
          category = cat;
          break;
        }
      }

      for (const [keyword, t] of Object.entries(typeKeywords)) {
        if (lowerLine.includes(keyword) && !type) {
          type = t;
          break;
        }
      }
    }

    setFormData(prev => ({
      ...prev,
      amount: amount || prev.amount,
      date: date || prev.date,
      category: category || prev.category,
      type: type || prev.type,
      description: description || prev.description,
    }));
  };

  return (
    <Layout pageTitle="Add Expense">
	<div className="max-w-[1073px] mx-auto">
		<div className="relative bg-white rounded-[20px] lg:rounded-[39px] shadow-[0_4px_20px_0_rgba(0,0,0,0.25),0_5px_10px_0_#F1F2FA]">
			<div className="p-6 lg:p-[50px] relative z-10">
            <h2 className="text-text-primary font-gilroy-bold text-2xl lg:text-[32px] mb-8 lg:mb-[59px]">
              Add Expense
            </h2>

		<form onSubmit={handleSubmit}>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 xl:gap-x-[325px] gap-y-6 lg:gap-y-[76px]">
				<div className="flex flex-col gap-[14px]">
                  <label htmlFor="date" className="text-text-primary font-gilroy-medium text-2xl">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full h-10 border border-border-light rounded-lg px-3 text-text-primary font-gilroy focus:outline-none focus:ring-2 focus:ring-blue-accent"
                  />
				</div>

				<div className="flex flex-col gap-[14px]">
                  <label htmlFor="amount" className="text-text-primary font-gilroy-medium text-2xl">
                    Amount
                  </label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full h-10 border border-border-light rounded-lg px-3 text-text-primary font-gilroy focus:outline-none focus:ring-2 focus:ring-blue-accent"
                  />
				</div>

				<div className="flex flex-col gap-[14px]">
                  <label htmlFor="category" className="text-text-primary font-gilroy-medium text-2xl">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full h-10 border border-border-light rounded-lg px-3 text-text-primary font-gilroy focus:outline-none focus:ring-2 focus:ring-blue-accent bg-white"
                  >
                    <option value="" disabled>Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.name} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
				</div>

				<div className="flex flex-col gap-[14px]">
                  <label htmlFor="type" className="text-text-primary font-gilroy-medium text-2xl">
                    Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full h-10 border border-border-light rounded-lg px-3 text-text-primary font-gilroy focus:outline-none focus:ring-2 focus:ring-blue-accent bg-white"
                  >
                    <option value="" disabled>Select type</option>
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                    <option value="Check">Check</option>
                  </select>
                </div>
			</div>

<div className="flex flex-col gap-[14px] mt-6 lg:mt-[76px]">
                <label htmlFor="description" className="text-text-primary font-gilroy-medium text-2xl">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                  rows={5}
                  className="w-full border border-border-light rounded-lg px-3 py-2 text-text-primary font-gilroy focus:outline-none focus:ring-2 focus:ring-blue-accent resize-none"
                />
			</div>

			<div className="flex flex-col gap-[14px] mt-6 lg:mt-[76px]">
                <label className="text-text-primary font-gilroy-medium text-2xl">
                  Scan Receipt (Optional)
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full h-10 border border-border-light rounded-lg px-3 text-text-primary font-gilroy focus:outline-none focus:ring-2 focus:ring-blue-accent"
                />
                {isOcrProcessing && <p className="text-sm text-text-secondary">Processing image...</p>}
                {ocrText && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-text-secondary font-gilroy-medium mb-1">Extracted Text:</p>
                    <p className="text-sm text-text-primary whitespace-pre-wrap truncate">{ocrText.slice(0, 200)}</p>
                    {ocrText.length > 200 && <p className="text-xs text-text-secondary mt-1">... (truncated)</p>}
                  </div>
                )}
			</div>

			{message && (
                <div className={`mt-6 p-4 rounded-lg ${message.type === 'success'
                  ? 'bg-green-100 text-green-800 border border-green-300'
                  : 'bg-red-100 text-red-800 border border-red-300'
                  }`}>
                  <p className="font-gilroy-medium">{message.text}</p>
                </div>
			)}

			<div className="flex justify-end mt-6 lg:mt-[48px]">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-[150px] h-12 bg-teal hover:bg-teal/90 text-white font-gilroy-bold text-base rounded-[50px] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Adding...' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
