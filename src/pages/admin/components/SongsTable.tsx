import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // Import Dialog components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMusicStore } from "@/stores/useMusicStore";
import { Calendar, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";

const SongsTable = () => {
  const { songs, isLoading, error, deleteSong, setEditingSong } =
    useMusicStore();

  // State to handle Delete Confirmation Dialog
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [songToDelete, setSongToDelete] = useState<string | null>(null);

  // Show Delete Confirmation Dialog
  const handleDeleteClick = (songId: string) => {
    setSongToDelete(songId);
    setShowDeleteConfirm(true);
  };

  // Handle Delete Confirmation
  const confirmDelete = async () => {
    if (songToDelete) {
      await deleteSong(songToDelete); // Call deleteSong from your store
      setShowDeleteConfirm(false); // Close dialog after deletion
      setSongToDelete(null);
    }
  };

  // Cancel the delete operation
  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setSongToDelete(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-zinc-400">Loading songs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-zinc-800/50">
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Artist</TableHead>
            <TableHead>Release Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {songs.map((song) => (
            <TableRow key={song._id} className="hover:bg-zinc-800/50">
              <TableCell>
                <img
                  src={song.imageUrl}
                  alt={song.title}
                  className="size-10 rounded object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">{song.title}</TableCell>
              <TableCell>{song.artist}</TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-1 text-zinc-400">
                  <Calendar className="h-4 w-4" />
                  {song.createdAt.split("T")[0]}
                </span>
              </TableCell>

              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  {/* Edit Button */}
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
                    onClick={() => setEditingSong(song)} // Open edit modal with song data
                  >
                    <Edit2 className="size-4" />
                  </Button>

                  {/* Delete Button */}
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    onClick={() => handleDeleteClick(song._id)} // Trigger delete confirmation dialog
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Confirmation Dialog for Deleting */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Song</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this song? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={cancelDelete}>
              Cancel
            </Button>
            <Button className="ml-2" onClick={confirmDelete}>
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SongsTable;
