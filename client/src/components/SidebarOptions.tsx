import {
    FolderOpen,
    ThumbsUp,
    History,
    TvMinimalPlay,
    Twitter,
    CircleUserRound,
    Home,
    Upload
  } from "lucide-react";
import { Link } from "react-router-dom";

function SidebarOptions() {
  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                to="/"
                className="flex items-center gap-3 rounded-lg focus:bg-muted px-3 py-2 text-muted-foreground focus:text-primary transition-all hover:text-primary"
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
              <Link
                to="subscription"
                className="flex items-center gap-3 rounded-lg focus:bg-muted px-3 py-2 text-muted-foreground focus:text-primary transition-all hover:text-primary"
              >
                <TvMinimalPlay className="h-4 w-4" />
                Subscriptions
              </Link>
              <Link
                to="tweet"
                className="flex items-center gap-3 rounded-lg focus:bg-muted px-3 py-2 text-muted-foreground focus:text-primary transition-all hover:text-primary"
              >
                <Twitter className="h-4 w-4" />
                Community Tweets
              </Link>
              <Link
                to="playlist"
                className="flex items-center gap-3 rounded-lg focus:bg-muted px-3 py-2 text-muted-foreground focus:text-primary transition-all hover:text-primary"
              >
                <FolderOpen className="h-4 w-4" />
                Playlists{" "}
              </Link>
              <Link
                to="liked-video"
                className="flex items-center gap-3 rounded-lg focus:bg-muted px-3 py-2 text-muted-foreground focus:text-primary transition-all hover:text-primary"
              >
                <ThumbsUp className="h-4 w-4" />
                Liked Videos
              </Link>
              <Link
                to="history"
                className="flex items-center gap-3 rounded-lg focus:bg-muted px-3 py-2 text-muted-foreground focus:text-primary transition-all hover:text-primary"
              >
                <History className="h-4 w-4" />
                History
              </Link>
              <Link
                to="dashboard"
                className="flex items-center gap-3 rounded-lg focus:bg-muted px-3 py-2 text-muted-foreground focus:text-primary transition-all hover:text-primary"
              >
                <CircleUserRound className="h-4 w-4" />
                Your Dashboard
              </Link>
              <Link
                to="upload"
                className="flex items-center gap-3 rounded-lg focus:bg-muted px-3 py-2 text-muted-foreground focus:text-primary transition-all hover:text-primary"
              >
                <Upload className="h-4 w-4" />
                Upload Video
              </Link>
            </nav>
  )
}

export default SidebarOptions