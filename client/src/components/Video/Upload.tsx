import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Progress } from "../ui/progress";
import { Card, CardContent } from "../ui/card";
import { Upload, X } from "lucide-react";
import { useUploadVideo } from "../../hooks/video.hook";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
export default function VideoUpload() {
  const navigate = useNavigate();
  const { mutateAsync: publishVideo, isError, error,isPending } = useUploadVideo();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const handleVideoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoFile(file);
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 500);
    }
  };

  const handleThumbnailFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();

    if (videoFile) formData.append("videoFile", videoFile);
    if (thumbnailFile) formData.append("thumbnail", thumbnailFile);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("isPublished", String(isPublished));

    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      await publishVideo(formData);
      toast.success("Video published successfully!");
      navigate("/");
     
    } catch (uploadError) {
      console.error("Error uploading video:", uploadError);
    }
  };

  const removeThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview(null);
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Upload Video</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {isError && (
          <p className="text-red-500">
            {error instanceof Error ? error.message : "Error uploading video"}
          </p>
        )}
        
        <div>
          <Label htmlFor="video-file">Video File</Label>
          <Input
            id="video-file"
            type="file"
            accept="video/*"
            onChange={handleVideoFileChange}
          />
          {videoFile && (
            <div className="mt-2">
              <p className="text-sm text-gray-500">{videoFile.name}</p>
              <Progress value={uploadProgress} className="mt-2" />
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="thumbnail">Thumbnail</Label>
          <Input
            id="thumbnail"
            type="file"
            accept="image/*"
            onChange={handleThumbnailFileChange}
          />
          {thumbnailPreview && (
            <Card className="mt-2 relative">
              <CardContent className="p-2">
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail preview"
                  className="w-full h-auto rounded"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={removeThumbnail}
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter video title"
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter video description"
            rows={4}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="published"
            checked={isPublished}
            onCheckedChange={setIsPublished}
          />
          <Label htmlFor="published">Publish video</Label>
        </div>

        <Button disabled={isPending} type="submit" className="w-full">
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />} Upload Video
        </Button>
      </form>
    </div>
  );
}
