

const validationErrors = async (errors) => {
  if (!errors.isEmpty()) {
    errors.array().map((err) => {
      if (err.msg.match(",") != null) {
        const tmpError = err.msg.split(",");
        let value = tmpError[0];
        err.msg = `${(tmpError[1], { value })}`;
      } else {
        err.msg = err.msg;
      }
    });
   
  }
};

module.exports = { validationErrors };
