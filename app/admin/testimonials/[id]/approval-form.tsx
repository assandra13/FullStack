"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material"
import { Check as CheckIcon, Close as CloseIcon, Block as BlockIcon } from "@mui/icons-material"
import type { Testimonial } from "@/types/prisma"

interface ApprovalFormProps {
  testimonial: Testimonial
}

export default function TestimonialApprovalForm({ testimonial }: ApprovalFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)

  const handleApprove = async () => {
    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/testimonials/${testimonial.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ approved: true }),
      })

      if (response.ok) {
        router.refresh()
        alert("Testimoni telah disetujui dan akan ditampilkan di situs.")
      } else {
        alert("Terjadi kesalahan saat menyetujui testimoni.")
      }
    } catch (error) {
      console.error("Error approving testimonial:", error)
      alert("Terjadi kesalahan saat menyetujui testimoni.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleReject = async () => {
    setOpenDialog(false)
    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/testimonials/${testimonial.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        router.push("/admin/testimonials")
        alert("Testimoni telah ditolak dan dihapus.")
      } else {
        alert("Terjadi kesalahan saat menolak testimoni.")
      }
    } catch (error) {
      console.error("Error rejecting testimonial:", error)
      alert("Terjadi kesalahan saat menolak testimoni.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUnapprove = async () => {
    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/testimonials/${testimonial.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ approved: false }),
      })

      if (response.ok) {
        router.refresh()
        alert("Testimoni telah dibatalkan persetujuannya dan tidak akan ditampilkan di situs.")
      } else {
        alert("Terjadi kesalahan saat membatalkan persetujuan testimoni.")
      }
    } catch (error) {
      console.error("Error unapproving testimonial:", error)
      alert("Terjadi kesalahan saat membatalkan persetujuan testimoni.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Box sx={{ display: "flex", gap: 2 }}>
        {testimonial.approved ? (
          <Button
            variant="outlined"
            color="warning"
            startIcon={<BlockIcon />}
            onClick={handleUnapprove}
            disabled={isSubmitting}
          >
            Batalkan Persetujuan
          </Button>
        ) : (
          <Button
            variant="contained"
            color="success"
            startIcon={<CheckIcon />}
            onClick={handleApprove}
            disabled={isSubmitting}
          >
            Setujui
          </Button>
        )}

        <Button
          variant="outlined"
          color="error"
          startIcon={<CloseIcon />}
          onClick={handleOpenDialog}
          disabled={isSubmitting}
        >
          Hapus
        </Button>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Konfirmasi Penghapusan</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Apakah Anda yakin ingin menghapus testimoni dari {testimonial.name}? Tindakan ini tidak dapat dibatalkan.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Batal
          </Button>
          <Button onClick={handleReject} color="error" autoFocus>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

