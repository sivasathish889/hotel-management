"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, MoreHorizontal, Pencil, Trash, Filter, ArrowUpDown } from "lucide-react"
import axios from "axios"
import { toast } from "react-toastify"



export default function RoomsPage() {
  const [rooms, setRooms] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [refresh, setRefresh] = useState(false)
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        await axios.get('/api/admin/get-rooms').then((res) => {
          setRooms(res.data)
        })
          .catch((Err) => {
            console.log(Err)
          })
      } catch (error) {
        console.log(error)
      }
    }
    fetchRoom()
  }, [refresh])

  const handleDeleteRoom = async (id) => {
    console.log(id)
    try {
      await axios.delete(`/api/admin/delete-room/${id}`).then((res) => {
        toast.success(res.data.message)
        setRefresh(!refresh)
      })
        .catch((err) => {
          toast.warning(err.message)
        })
    } catch (error) {
      console.log(error)
    }
  }
  const filteredRooms = rooms.filter(
    (room) =>
      room.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.roomType.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const confirmDelete = () => {
    if (roomToDelete) {
      setRooms(rooms.filter((room) => room._id !== roomToDelete))
      setDeleteDialogOpen(false)
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-500 hover:bg-green-600">Available</Badge>
      case "occupied":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Occupied</Badge>
      case "maintenance":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Maintenance</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Rooms</h1>
          <p className="text-muted-foreground">Manage your hotel rooms</p>
        </div>
        <Button asChild>
          <Link href="rooms/add">
            <Plus className="mr-2 h-4 w-4" />
            Add Room
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search rooms..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Room No.</TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  Type
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  Price
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRooms.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No rooms found.
                </TableCell>
              </TableRow>
            ) : (
              filteredRooms.map((room, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{room.roomNumber}</TableCell>
                  <TableCell>{room.roomType}</TableCell>
                  <TableCell>{room.roomCapacity} guests</TableCell>
                  <TableCell>${room.roomPrice}</TableCell>
                  <TableCell>{getStatusBadge(room.roomStatus)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={{
                            pathname: `/admin/rooms/edit/${room._id}`,
                          
                          }} className="flex items-center">
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center text-red-600 focus:text-red-600"
                          onClick={() => handleDeleteRoom(room._id)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete this room?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the room and remove it from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
