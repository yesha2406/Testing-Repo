const statusCode = _CONSTANT.statusCode;

exports.isSignedIn = async (req, res, next) => {
  try {
    let berearToken =
      req.body.token || req.query.token || req.headers['authorization'];
    if (!berearToken) {
      return _RESPONSE.sendErrorResponse(
        res,
        _MESSAGES.UNAUTHORIZED,
        statusCode.UNAUTHORIZED,
        {}
      );
    }

    const token = berearToken.split(' ')[1];
    let decoded = await _UTIL.verifyJwt(token);
    req.signedInUser = decoded;
    next();
  } catch (err) {
    console.log('In catch ::: ', err);
    return _RESPONSE.sendErrorResponse(
      res,
      err,
      statusCode.INTERNAL_SERVER_ERROR,
      {}
    );
  }
};
