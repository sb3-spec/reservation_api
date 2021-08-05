const express = require('express')
const router = express.Router()
const Reservation = require('../models/reservation') 

// Getting all
router.get('/', async (req, res) => {
    try {
        const reservations = await Reservation.find()
        res.json(reservations)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

// Getting one
router.get('/:id', getReservation, (req, res) => {
    res.send(res.reservation)
})

// Creating one
router.post('/', async (req, res) => {
    const reservation = new Reservation({
        name: req.body.name,
        reservationDate: req.body.reservationDate,
        partySize: req.body.partySize
    })
    try {
        const newReservation = await reservation.save()
        res.status(201).json(newReservation)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating one
router.patch('/:id', getReservation, async (req, res) => {
  if (req.body.name != null) {
      res.reservation.name = req.body.name
  }

  if (req.body.reservationDate != null) {
      res.reservation.reservationDate = req.body.reservationDate
  }

  if (req.body.partySize != null) {
      res.reservation.partySize = req.body.partySize
  }

  try {
      const updatedSubscriber = await res.reservation.save()
      res.json(updatedSubscriber)
  } catch (err) {
      res.status(400).json({ message: err.message})
  }
})

// Deleting one
router.delete('/:id', getReservation, async (req, res) => {
    try {
        await res.reservation.remove()
        res.json({ message: "Reservation removed"})
    }  catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getReservation(req, res, next) {
    let reservation 
    try {
        reservation = await Reservation.findById(req.params.id)
        if (reservation == null) {
            return res.status(404).json({message: "Can't find reservation"})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.reservation = reservation
    next()
}

module.exports = router