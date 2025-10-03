import User from "../model/User.js";

export const createAgent = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingAgent = await User.findOne({ email });
    if (existingAgent) {
      return res.status(400).json({ message: "Agent with this email already exists" });
    }

    const agent = await User.create({
      name,
      email,
      mobile,
      password,
      role: "agent",
    });

    res.status(201).json({
      _id: agent._id,
      name: agent.name,
      email: agent.email,
      mobile: agent.mobile,
      role: agent.role,
    });
  } catch (error) {
    console.error("Create Agent Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get All Agents
export const getAgents = async (req, res) => {
  try {
    const agents = await User.find({ role: "agent" })
    res.json(agents);
  } catch (error) {
    console.error("Get Agents Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update Agent
export const updateAgent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, mobile, password } = req.body;

    const agent = await User.findById(id);
    if (!agent || agent.role !== "agent") {
      return res.status(404).json({ message: "Agent not found" });
    }

    agent.name = name || agent.name;
    agent.email = email || agent.email;
    agent.mobile = mobile || agent.mobile;

    if (password) agent.password = password;

    await agent.save();

    res.json({
      _id: agent._id,
      name: agent.name,
      email: agent.email,
      mobile: agent.mobile,
      role: agent.role,
    });
  } catch (error) {
    console.error("Update Agent Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete Agent
export const deleteAgent = async (req, res) => {
  try {
    const { id } = req.params;

    const agent = await User.findById(id);
    if (!agent || agent.role !== "agent") {
      return res.status(404).json({ message: "Agent not found" });
    }

    await agent.deleteOne();

    res.json({ message: "Agent removed successfully" });
  } catch (error) {
    console.error("Delete Agent Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
