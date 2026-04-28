'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit2, Check, X, Camera } from 'lucide-react';

interface ProfileData {
  name: string;
  email: string;
  position: string;
  phone: string;
  avatar: string;
  initials: string;
  tier: string;
  joinDate: string;
}

export function ProfileSection() {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPosition, setIsEditingPosition] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  
  const [profile, setProfile] = useState<ProfileData>({
    name: 'Jimmy Fallon',
    email: 'jimmy.fallon@corefinity.com',
    position: 'Manager',
    phone: '+1 (555) 123-4567',
    avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Jimmy_Fallon%2C_Montclair_Film_Festival%2C_2013-sFSRlNwid9ri1trYFhnZyPHypePxIP.jpg',
    initials: 'JF',
    tier: 'Enterprise Plan',
    joinDate: 'January 1, 2024',
  });

  const [editedName, setEditedName] = useState(profile.name);
  const [editedEmail, setEditedEmail] = useState(profile.email);
  const [editedPosition, setEditedPosition] = useState(profile.position);
  const [editedPhone, setEditedPhone] = useState(profile.phone);

  const handleSaveName = () => {
    setProfile({ ...profile, name: editedName });
    setIsEditingName(false);
  };

  const handleCancelName = () => {
    setEditedName(profile.name);
    setIsEditingName(false);
  };

  const handleSaveEmail = () => {
    setProfile({ ...profile, email: editedEmail });
    setIsEditingEmail(false);
  };

  const handleCancelEmail = () => {
    setEditedEmail(profile.email);
    setIsEditingEmail(false);
  };

  const handleSavePosition = () => {
    setProfile({ ...profile, position: editedPosition });
    setIsEditingPosition(false);
  };

  const handleCancelPosition = () => {
    setEditedPosition(profile.position);
    setIsEditingPosition(false);
  };

  const handleSavePhone = () => {
    setProfile({ ...profile, phone: editedPhone });
    setIsEditingPhone(false);
  };

  const handleCancelPhone = () => {
    setEditedPhone(profile.phone);
    setIsEditingPhone(false);
  };

  return (
    <Card className="bg-card shadow-card">
      <CardHeader className="border-b border-border">
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Manage your account details and profile picture</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-8">
          
          {/* Avatar Section */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-border/50">
            <div className="relative group cursor-pointer">
              <Avatar className="h-24 w-24 shadow-card">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                  {profile.initials}
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                <Camera className="text-white h-6 w-6" />
              </div>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold text-foreground">Profile Picture</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-3">
                JPG, GIF or PNG. Max size of 800K
              </p>
              <Button variant="outline" size="sm">
                Upload New Image
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Name Section */}
            <div className="space-y-2 md:col-span-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Full Name</label>
                {!isEditingName && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsEditingName(true)}
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              {isEditingName ? (
                <div className="flex gap-2 mt-1">
                  <Input
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="flex-1"
                    placeholder="Enter your name"
                  />
                  <Button
                    size="sm"
                    variant="default"
                    onClick={handleSaveName}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCancelName}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <p className="text-foreground font-medium h-9 flex items-center border border-transparent px-3 bg-muted/30 rounded-md">
                  {profile.name}
                </p>
              )}
            </div>

            {/* Email Section */}
            <div className="space-y-2 md:col-span-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Email Address</label>
                {!isEditingEmail && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsEditingEmail(true)}
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              {isEditingEmail ? (
                <div className="flex gap-2 mt-1">
                  <Input
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                    className="flex-1"
                    placeholder="Enter your email"
                  />
                  <Button
                    size="sm"
                    variant="default"
                    onClick={handleSaveEmail}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCancelEmail}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <p className="text-foreground font-medium h-9 flex items-center border border-transparent px-3 bg-muted/30 rounded-md">
                  {profile.email}
                </p>
              )}
            </div>

            {/* Position Section */}
            <div className="space-y-2 md:col-span-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Position</label>
                {!isEditingPosition && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsEditingPosition(true)}
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              {isEditingPosition ? (
                <div className="flex gap-2 mt-1">
                  <Input
                    value={editedPosition}
                    onChange={(e) => setEditedPosition(e.target.value)}
                    className="flex-1"
                    placeholder="Enter your position"
                  />
                  <Button
                    size="sm"
                    variant="default"
                    onClick={handleSavePosition}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCancelPosition}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <p className="text-foreground font-medium h-9 flex items-center border border-transparent px-3 bg-muted/30 rounded-md">
                  {profile.position}
                </p>
              )}
            </div>

            {/* Phone Section */}
            <div className="space-y-2 md:col-span-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Phone Number</label>
                {!isEditingPhone && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsEditingPhone(true)}
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              {isEditingPhone ? (
                <div className="flex gap-2 mt-1">
                  <Select defaultValue="+1">
                    <SelectTrigger className="w-[100px] h-9">
                      <SelectValue placeholder="Code" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="+1">US (+1)</SelectItem>
                      <SelectItem value="+44">UK (+44)</SelectItem>
                      <SelectItem value="+91">IN (+91)</SelectItem>
                      <SelectItem value="+61">AU (+61)</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    value={editedPhone}
                    onChange={(e) => setEditedPhone(e.target.value)}
                    className="flex-1"
                    placeholder="Enter phone number"
                  />
                  <Button
                    size="sm"
                    variant="default"
                    onClick={handleSavePhone}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCancelPhone}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <p className="text-foreground font-medium h-9 flex items-center border border-transparent px-3 bg-muted/30 rounded-md">
                  {profile.phone}
                </p>
              )}
            </div>

            {/* Plan */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Plan Type</label>
              <p className="text-foreground h-9 flex items-center border border-transparent px-3 bg-muted/30 rounded-md">
                {profile.tier}
              </p>
            </div>

            {/* Join Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Member Since</label>
              <p className="text-foreground h-9 flex items-center border border-transparent px-3 bg-muted/30 rounded-md">
                {profile.joinDate}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
