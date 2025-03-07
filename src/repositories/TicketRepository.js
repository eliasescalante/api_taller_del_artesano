import Ticket from "../models/Ticket.js";

class TicketRepository {
    async create(ticketData) {
        return await Ticket.create(ticketData);
    }

    async getByUserId(userId) {
        return await Ticket.find({ user: userId }).populate("items.product");
    }
}

export default new TicketRepository();
