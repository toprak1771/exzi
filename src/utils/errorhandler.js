class ErrorHandler extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
}

const handleError = (req, res, err) => {
  let { status, message } = err;
  console.log(message);
  if (!Array.isArray(message)) {
    if (message.match(",") != null) {
      const tmpError = message.split(",");
      let value = tmpError[0];
      message = `${(tmpError[1], { value })}`;
    } else {
      message = message;
    }
  }
  res.status(status || 400).json({
    message,
  });
};

  const validationErrors = async (errors) => {
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().map((err) => {
        console.log("err:",err);
        if (err.msg.includes(",")) {
          console.log("burda")
          const tmpError = err.msg.split(",");
          const value = tmpError[0];
          console.log("value:",value);
          return { ...err, msg: `${tmpError[1]} (Value: ${value})` };
        } else {
          return err; // Hata mesajını değiştirmeden geri döndür
        }
      });
      
      // Formatted errors'i hata handler'a gönder
      throw new ErrorHandler(400, errors.array());
    }
  };

  module.exports = { ErrorHandler, validationErrors,handleError };
