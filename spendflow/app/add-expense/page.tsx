"use client";

import { useState } from 'react';
import Layout from '../components/Layout';
import { addExpense, getUserCategories } from '../actions/expenses';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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
  const router = useRouter();

  useEffect(() => {
    async function loadCategories() {
      const userCats = await getUserCategories();
      // Define defaults
      const defaults = ["Transport", "Food", "Entertainment", "Shopping"];

      // Merge unique categories
      const uniqueCats = new Map();
      defaults.forEach(name => uniqueCats.set(name, { id: name, name })); // Use name as ID for defaults temporarily if needed or just handle strings
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

  return (
    <Layout pageTitle="Add Expense">
      <div className="max-w-[1073px] mx-auto">
        {/* Main Form Card */}
        <div className="relative bg-white rounded-[20px] lg:rounded-[39px] shadow-[0_4px_20px_0_rgba(0,0,0,0.25),0_5px_10px_0_#F1F2FA]">
          <div className="p-6 lg:p-[50px] relative z-10">
            <h2 className="text-text-primary font-gilroy-bold text-2xl lg:text-[32px] mb-8 lg:mb-[59px]">
              Add Expense
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 xl:gap-x-[325px] gap-y-6 lg:gap-y-[76px]">
                {/* Date Field */}
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

                {/* Amount Field */}
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

                {/* Category Field */}
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

                {/* Type Field */}
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

              {/* Description Field - Full Width */}
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

              {/* Success/Error Message */}
              {message && (
                <div className={`mt-6 p-4 rounded-lg ${message.type === 'success'
                  ? 'bg-green-100 text-green-800 border border-green-300'
                  : 'bg-red-100 text-red-800 border border-red-300'
                  }`}>
                  <p className="font-gilroy-medium">{message.text}</p>
                </div>
              )}

              {/* Submit Button */}
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
