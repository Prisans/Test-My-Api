import History from "../model/history.js";

export async function saveHistory(req, res) {
    try {
        const { url, method, headers, body, response, status, time, size } = req.body;
        const userId = req.user._id;

        const history = await History.create({
            user: userId,
            url,
            method,
            headers,
            body,
            response,
            status,
            time,
            size
        });

        res.status(201).json({ success: true, data: history });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

export async function getHistory(req, res) {
    try {
        const userId = req.user._id;
        const history = await History.find({ user: userId }).sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: history });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

export async function deleteHistory(req, res) {
    try {
        const { id } = req.params;
        await History.findByIdAndDelete(id);
        res.status(200).json({ success: true, msg: "History deleted" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}
