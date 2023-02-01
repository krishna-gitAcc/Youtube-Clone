export  const CustomerrorHandler = (err, req, res, next) => {
    let customerror = err;
    if(err.name === "SyntaxError"){
        customerror = { message : "Unexpected Syntax",
                        status: 400 };
    }
    if(err.name === "ValidationError"){
        customerror = {
            message : err.message,
            status : 400,
        };
    }

    if(err.code === 11000){
        customerror = {
            message : "Check Your Inputs, Duplicate Key Found",
            status : 400,
        }
    }
    res.status(customerror.status || 500).json({
        success: false,
        message: customerror.message || "A error, please try again."
    });
}