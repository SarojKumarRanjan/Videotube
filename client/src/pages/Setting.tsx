import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Upload, Save } from "lucide-react";
import { useUpdateAccountDetails, useUpdateUserAvatar, useUpdateUserCoverImage, useChangePassword } from "../hooks/auth.hook";
import { toast } from "react-hot-toast";
function Setting() {
  
  const user = useSelector((state: any) => state.auth.user);
  const {mutateAsync:updateAccountDetails,error:updateAccountDetailsError} = useUpdateAccountDetails();
  const {mutateAsync:updateUserAvatar,error:updateUserAvatarError} = useUpdateUserAvatar();
  const {mutateAsync:updateUserCoverImage,error:updateUserCoverImageError} = useUpdateUserCoverImage();
  const {mutateAsync:changePassword,error:changePasswordError} = useChangePassword();
  const [formData, setFormData] = useState({
    userName: user?.userName || "",
    fullName: user?.fullName || "",
    email: user?.email || "",
    oldPassword: "",
    newPassword: "",
  });
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    
   const response = await updateAccountDetails(formData);
     if(response){
      toast.success(response.message);
     }
     if(updateAccountDetailsError){
      toast.error(updateAccountDetailsError.message);
     }
    
  };

  const handleChangePassword = async(e: React.FormEvent) => {
    e.preventDefault();
   const response = await changePassword({oldPassword:formData.oldPassword,newPassword:formData.newPassword});
   if(response){
    setFormData({
      ...formData,
      oldPassword:"",
      newPassword:""
    })
    toast.success(response.message);
   }
   if(changePasswordError){
    toast.error(changePasswordError.message);
   }
  }


  const handleCoverImageUpload = async(file:File) => {
    const response = await updateUserCoverImage(file);
    if(response){
      toast.success(response.message);
    }
    if(updateUserCoverImageError){
      toast.error(updateUserCoverImageError.message);
    }
  }

  const handleAvatarUpload = async(file:File) => {
    const response = await updateUserAvatar(file);
    if(response){
      toast.success(response.message);
    }
    if(updateUserAvatarError){
      toast.error(updateUserAvatarError.message);
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'cover') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'avatar') {
          setAvatar(file);
          setAvatarPreview(reader.result as string);
        } else {
          setCoverImage(file);
          setCoverImagePreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative h-48 rounded-lg bg-gray-100 overflow-hidden">
                <img
                  src={coverImagePreview || user?.coverImage || "/default-cover.jpg"}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 right-4 space-x-2">
                  <input
                    id="coverImage"
                    name="coverImage"
                    onChange={(e) => handleImageChange(e, 'cover')}
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                  <label
                    htmlFor="coverImage"
                    className="inline-flex items-center px-4 py-1 bg-white hover:bg-gray-100 text-gray-800 rounded cursor-pointer"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Change Cover
                  </label>
                  {coverImage && (
                    <Button
                      variant="outline"
                      onClick={() => handleCoverImageUpload(coverImage)}
                    >
                      Save Cover
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={avatarPreview || user?.avatar} />
                  <AvatarFallback>{user?.userName?.[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="space-x-2">
                  <input
                    id="avatar"
                    name="avatar"
                    onChange={(e) => handleImageChange(e, 'avatar')}
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                  <label
                    htmlFor="avatar"
                    className="inline-flex items-center px-4 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded cursor-pointer"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Change Avatar
                  </label>
                  {avatar && (
                    <Button
                      variant="outline"
                      onClick={() => handleAvatarUpload(avatar)}
                    >
                      Save Avatar
                    </Button>
                  )}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="username">Username</label>
                  <Input
                    id="username"
                    name="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="fullName">Full Name</label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email">Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="oldPassword">Current Password</label>
                  <Input
                    id="oldPassword"
                    name="oldPassword"
                    type="password"
                    value={formData.oldPassword}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="newPassword">New Password</label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                  />
                  {changePasswordError && <p className="text-red-500">{changePasswordError.message}</p>}
                </div>

                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  Update Password
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Setting;