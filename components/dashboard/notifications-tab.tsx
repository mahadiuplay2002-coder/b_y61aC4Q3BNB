'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface NotificationsTabProps {
  environmentId?: string;
}

export function NotificationsTab({ environmentId }: NotificationsTabProps) {
  const notificationSettings = [
    { 
      name: 'Emergency Alerts', 
      description: 'Receive emergency alerts in regards to security and/or availability of the environments you are subscribed to.',
      enabled: true 
    },
    { 
      name: 'Maintenance window', 
      description: 'Receive notifications when a maintenance window is scheduled/created/completed.',
      enabled: true 
    },
    { 
      name: 'Monitoring Alerts', 
      description: 'Receive alerts when monitored services is down.',
      enabled: true 
    },
    { 
      name: 'Deployment Alerts', 
      description: 'Receive notifications on deployment completion or failure.',
      enabled: true 
    },
    { 
      name: 'Newsletters', 
      description: 'Receive notifications around new features, functionalities and special offers.',
      enabled: true 
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[22px] font-medium text-[#1f4a76] mb-1">Notifications</h2>
        <p className="text-[13px] text-[#2e5e7e]">Update your notifications settings.</p>
      </div>

      <div className="space-y-0">
        {notificationSettings.map((setting, idx) => (
          <div key={idx} className="flex gap-4 py-5 border-b border-[#f0f8fa] last:border-none items-start">
            <Checkbox 
              defaultChecked={setting.enabled} 
              className="mt-1 border-[#ff6b2a] data-[state=checked]:bg-[#ff6b2a] data-[state=checked]:text-white shadow-none h-[18px] w-[18px] rounded-[3px]"
            />
            <div className="flex flex-col flex-1">
              <span className="text-[13px] font-medium text-[#1f4a76] -mb-0.5">{setting.name}</span>
              <span className="text-[13px] text-[#2e5e7e] leading-relaxed">{setting.description}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Default Subscriptions Section */}
      <div className="pt-2 border-t border-[#f0f8fa]">
        <h3 className="text-[16px] font-medium text-[#1f4a76] mb-2 mt-4">Ticket Default Subscriptions</h3>
        <p className="text-[13px] text-[#2e5e7e] leading-relaxed mb-4">
          Select which companies' tickets you would like to be subscribed to automatically. This setting can be overridden on a per ticket basis using the subscribers section on the ticket page.
          <br /><br />
          You will always be subscribed to tickets you have raised, regardless of selections below.
        </p>

        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <span className="font-bold text-[#1f4a76] text-[13px]">Your Company:</span>
            <div className="flex items-center gap-2">
              <Checkbox 
                defaultChecked 
                className="border-[#ff6b2a] data-[state=checked]:bg-[#ff6b2a] data-[state=checked]:text-white shadow-none h-4 w-4 rounded-[3px]"
              />
              <span className="text-[13px] text-[#1f4a76]">Example Agency</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <span className="text-[#1f4a76] text-[13px]">Inherited companies:</span>
            <button className="text-left text-[11px] underline text-[#2e5e7e] font-medium w-fit hover:text-[#1f4a76]">
              Select / Unselect All
            </button>
            <div className="flex items-center gap-2 mt-1 ml-4">
              <Checkbox 
                defaultChecked 
                className="border-[#ff6b2a] data-[state=checked]:bg-[#ff6b2a] data-[state=checked]:text-white shadow-none h-4 w-4 rounded-[3px]"
              />
              <span className="text-[13px] text-[#1f4a76]">Example Company</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Action */}
      <div className="bg-[#f8fcfd] -mx-6 -mb-6 p-4 mt-6 border-t border-[#dcecf1] rounded-b-lg flex justify-end">
        <Button className="bg-[#ff6b2a] hover:bg-[#e95a1c] text-white font-medium px-8 h-9 rounded shadow-sm border-none">
          Save
        </Button>
      </div>
    </div>
  );
}
