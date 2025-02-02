const e = require("express");
const {validateRoomBooking} = require("../validations/room.validation")

const bookings = [
    {
        roomNo: 101,
        name: "Virat kohli",
        email: "viratkohli@gmail.com",
        phone: "1234567890",
        checkIn: "2025-02-01",
        checkOut: "2025-02-02"
    },
    {
        roomNo: 102,
        name: "Rahul Dravid",
        email: "rahuld@gmail.com",
        phone: "9876543210",
        checkIn: "2025-02-10",
        checkOut: "2025-02-15"
    }
];  

exports.getBookingDetails = async(req, res, next) => {
    try{
        const { emailId } = req.query;
        // const result = getBookingInfo(emailAddress); If we are using the database, will use repo call
        const booking = bookings.find(b => b.email === emailId);
        
    if (!booking) {
        const errObj = {
            success : false,
            message : "Booking not found"
        }
       return res.status(404).json(errObj)
    }
    const successResObj={
        "success" : true,
        data : booking
    }
    return res.status(200).json(successResObj);

    }
    catch(err){
        //logging of errors eg. cloudwatch
        next(err)
    }
}

exports.getGuestDetails = async(req, res, next) => {
    try{
        const guests = bookings.map(booking => ({
            roomNumber: booking.roomNo,
            name: booking.name,
            phone: booking.phone,
            checkIn: booking.checkIn,
            checkOut: booking.checkOut
        }));
        
    const successResObj={
        "success" : true,
        data : guests
    }
    res.status(200).json(successResObj);

    }
    catch(err){
        //logging of errors eg. cloudwatch
        next(err)
    }
}

exports.deleteBooking = async(req, res, next) => {
    try{
    const { emailId, roomNumber } = req.query;
    const errObj = {
        success : false,
        message : ""
    }
    if(!emailId || !roomNumber){
        const errObj = {
            success : false,
            message : "Both emailId and roomNumber is required"
        }
        errObj.message = "Both emailId and roomNumber is required"
        return res.json(errObj)
       
    }     
    const index = bookings.findIndex(b => b.email == emailId && b.roomNo == roomNumber);
    if (index === -1) {
        errObj.message = "Email and room number mismatch"
        return res.json(errObj)
    }
    bookings.splice(index, 1);
    const successResObj={
        success : true,
        message : `Room number ${roomNumber} registered with email ${emailId} deleted successfully.`
    }
    res.json(successResObj);

    }
    catch(err){
        //logging of errors eg. cloudwatch
        next(err)
    }
}
exports.registerBooking = async(req, res, next) => {
    try{
    const { name, email, phone, checkIn, checkOut } = req.body;
    const err =await  validateRoomBooking(req);
    if(err){
        const errObj = {
            success : false,
            message : "Invalid input"
        }
       return res.json(errObj)
    }
    const lastBookedRoomNumber = bookings[bookings.length -1].roomNo;
    const roomAvailable = bookings.length <=4;
    if(!roomAvailable){
        const errObj = {
            success : false,
            message : "Rooms are full"
        }
       return res.json(errObj)
    }
    const booking = { roomNo: lastBookedRoomNumber+1, name, email, phone, checkIn, checkOut };
    bookings.push(booking);
    const successResObj={
        success : true,
        message : `Room booked successfully.`,
        data : booking,
    }
    res.status(201).json(successResObj);

    }
    catch(err){
        //logging of errors eg. cloudwatch
        next(err)
    }
}
exports.updateBooking = async(req, res, next) => {
    try{
        const { email, roomNumber, checkIn, checkOut } = req.body;
        const booking = bookings.find(b => b.email === email && b.roomNo === roomNumber);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found." });
        }
        checkIn? booking.checkIn = checkIn: null;
        checkOut? booking.checkOut = checkOut: null;
        res.json({ message: "Booking updated successfully.", booking })

    }
    catch(err){
        //logging of errors eg. cloudwatch
        next(err)
    }
}
