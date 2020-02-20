export default async (req, res) => {
  console.log(req);
  const isInProd = process.env.NODE_ENV === 'production';
  const isInDev = process.env.NODE_ENV === 'development';
  const greeting = process.env.GREETING;
  res.status(200).send(`Environment is ${isInProd ? 'production' : 'development'}. ${greeting}`);
};
