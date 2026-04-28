'use client';

import { Button } from '@/components/ui/button';

export function TwoFactorTab() {
  return (
    <div className="w-full">
      <div className="bg-card border border-[#dcecf1] rounded-lg shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-[#f8fcfd] border-b border-[#dcecf1] px-6 py-4">
          <h2 className="text-[15px] font-bold text-[#1f4a76]">Two-Factor-Authentication</h2>
        </div>

        {/* Content Rows */}
        <div className="divide-y divide-[#dcecf1]">
          {/* Google 2FA */}
          <div className="flex items-center justify-between px-6 py-5 bg-white">
            <span className="text-[15px] text-[#1f4a76]">Google 2FA</span>
            <Button className="bg-[#ff6b2a] hover:bg-[#e95a1c] text-white font-medium px-6 h-9 rounded shadow-sm border-none">
              Setup
            </Button>
          </div>

          {/* SMS 2FA */}
          <div className="flex items-center justify-between px-6 py-5 bg-white">
            <span className="text-[15px] text-[#1f4a76]">SMS 2FA</span>
            <Button className="bg-[#ff6b2a] hover:bg-[#e95a1c] text-white font-medium px-6 h-9 rounded shadow-sm border-none">
              Disable
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

