import User from "../models/User.js";
import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET;

const authGuard = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  //pega o token que vem na requisição e separa apenas o token que fica após um espaço Ex: Bearer yy32106d5r
  const token = authHeader && authHeader.split(" ")[1];

  //Check if header has a  token
  if (!token) return res.status(401).json({ errors: ["Acesso negado!"] });
  try {
    //verifica o token com base no segredo e retorna o id do usuario na constante como objeto
    const verified = jwt.verify(token, jwtSecret);
    //tenta encontrar o usuario no banco pelo id mas tira o password da busca por segurança e coloca na requisição
    req.user = await User.findById(verified.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ erros: ["Token inválido."] });
  }
};

export default authGuard;
