// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useMusicStore } from "@/stores/useMusicStore";

// interface SongDialogProps {
//   editingSong: any; // You can replace 'any' with a specific type if needed
//   setEditingSong: React.Dispatch<React.SetStateAction<any>>;
// }

// const SongDialog: React.FC<SongDialogProps> = ({ editingSong, setEditingSong }) => {
//   const [title, setTitle] = useState(editingSong?.title || "");
//   const [artist, setArtist] = useState(editingSong?.artist || "");
//   const [album, setAlbum] = useState(editingSong?.album?.title || "");
//   const [duration, setDuration] = useState(editingSong?.duration || 0);

//   const { updateSong, addSong } = useMusicStore();

//   useEffect(() => {
//     if (editingSong) {
//       setTitle(editingSong.title);
//       setArtist(editingSong.artist);
//       setAlbum(editingSong.album?.title || "");
//       setDuration(editingSong.duration);
//     }
//   }, [editingSong]);

//   const handleSave = () => {
//     if (editingSong) {
//       updateSong({ ...editingSong, title, artist, album, duration });
//     } else {
//       addSong({ title, artist, album, duration });
//     }
//     setEditingSong(null); // Reset after saving
//   };

//   const handleCancel = () => {
//     setEditingSong(null); // Close dialog without saving
//   };

//   return (
//     <div>
//       <h2>{editingSong ? "Edit Song" : "Add New Song"}</h2>
//       <Input
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Song Title"
//       />
//       <Input
//         value={artist}
//         onChange={(e) => setArtist(e.target.value)}
//         placeholder="Artist"
//       />
//       <Input
//         value={album}
//         onChange={(e) => setAlbum(e.target.value)}
//         placeholder="Album"
//       />
//       <Input
//         value={duration}
//         onChange={(e) => setDuration(Number(e.target.value))}
//         placeholder="Duration (seconds)"
//         type="number"
//       />
//       <div>
//         <Button onClick={handleSave}>Save</Button>
//         <Button onClick={handleCancel}>Cancel</Button>
//       </div>
//     </div>
//   );
// };

// export default SongDialog;
