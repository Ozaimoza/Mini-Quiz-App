const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

class Admin {
  //register
  static register = async (req, res) => {
    try {
      const { full_name, username, password, email } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const Data = await prisma.admin.create({
        data: {
          full_name: full_name,
          username: username,
          password: hashedPassword,
          email: email,
        },
      });

      const response = {
        message: "success Create admin",
        data: Data,
      };

      res.status(201).json(response);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal Server Error",
        error: err.message || "Something went wrong",
      });
    }
  };

  //login
  static login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const admin = await prisma.admin.findFirst({
        where: { username },
      });

      // periksa admin dan password
      if (!admin || !(await bcrypt.compare(password, admin.password))) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Buat token JWT
      const token = jwt.sign({ admin_id: admin.admin_id }, process.env.SECRET, {
        expiresIn: "1d",
      });

      // Simpan token dalam cookie
      res.cookie("token", token, { httpOnly: true, maxAge: 90000000 });
      res.cookie("currentAdmin", admin.admin_id, {
        httpOnly: true,
        maxAge: 90000000,
      });

      // Kirim respons dengan token
      const response = {
        message: "login Success",
        token: token,
        currentAdmin: admin.admin_id,
      };
      res.status(200).json(response);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal Server Error",
        error: err.message || "Something went wrong",
      });
    }
  };

  // logout
  static logout = async (req, res) => {
    try {
      // Hapus cookie dengan nama 'token'
      res.clearCookie("token");
      res.clearCookie("currentUser");

      res.json("success logout");
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal Server Error",
        error: err.message || "Something went wrong",
      });
    }
  };
}

module.exports = Admin;
