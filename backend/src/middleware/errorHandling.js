const errorHandling = async (err, req, res, next) => {
  console.log(err.stack);
  res
    .status(500)
    .json({ message: "Internal Server error", error: err.message });
};

export default errorHandling;
