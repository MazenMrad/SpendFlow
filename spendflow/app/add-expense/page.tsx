"use client";

import { useState } from 'react';
import Layout from '../components/Layout';

export default function AddExpense() {
  const [formData, setFormData] = useState({
    date: '',
    amount: '',
    category: '',
    type: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
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
                    <option value="Transport">Transport</option>
                    <option value="Food">Food</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Shopping">Shopping</option>
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

              {/* Submit Button */}
              <div className="flex justify-end mt-6 lg:mt-[48px]">
                <button
                  type="submit"
                  className="w-[150px] h-12 bg-teal hover:bg-teal/90 text-white font-gilroy-bold text-base rounded-[50px] transition-colors cursor-pointer"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
