import Url from "../models/Url.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
const checkUrlLimit = asyncHandler(async (req, res, next) => {
  const user = req.user;

  if (user.plan === "premium") {
    return next();
  }
  const existingCount = await Url.countDocuments({ owner: user._id });

  if (existingCount >= user.urlLimit) {
    throw new ApiError(
      403,
      `Free plan limit reached (${user.urlLimit} URLs). Upgrade to premium for unlimited short links.`,
    );
  }

  next();
});

export default checkUrlLimit;
