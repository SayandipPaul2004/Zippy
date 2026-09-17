import validator from "validator";
import Url from "../models/Url.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import generateCode from "../utils/generateCode.js";

export const createShortUrl = asyncHandler(async (req, res) => {
  const { originalUrl, customCode } = req.body;

  if (!originalUrl || !validator.isURL(originalUrl)) {
    throw new ApiError(400, "A valid originalUrl is required");
  }

  if (customCode && req.user.plan !== "premium") {
    throw new ApiError(403, "Custom short codes require a premium plan");
  }

  let shortCode = customCode || generateCode(6);

  let existing = await Url.findOne({ shortCode });
  while (existing) {
    if (customCode) {
      throw new ApiError(409, "That custom code is already taken");
    }
    shortCode = generateCode(6);
    existing = await Url.findOne({ shortCode });
  }

  const url = await Url.create({
    originalUrl,
    shortCode,
    owner: req.user._id,
  });

  res.status(201).json({
    success: true,
    url: {
      id: url._id,
      shortCode: url.shortCode,
      shortUrl: `${process.env.BASE_URL}/${url.shortCode}`,
      originalUrl: url.originalUrl,
      clicks: url.clicks,
      createdAt: url.createdAt,
    },
  });
});

export const redirectToOriginal = asyncHandler(async (req, res) => {
  const { code } = req.params;

  const url = await Url.findOne({ shortCode: code, isActive: true });
  if (!url) {
    throw new ApiError(404, "Short URL not found");
  }

  if (url.expiresAt && url.expiresAt < new Date()) {
    throw new ApiError(410, "This short URL has expired");
  }

  url.clicks += 1;
  await url.save();

  res.redirect(url.originalUrl);
});

export const getMyUrls = asyncHandler(async (req, res) => {
  const urls = await Url.find({ owner: req.user._id }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: urls.length,
    urls: urls.map((u) => ({
      id: u._id,
      shortCode: u.shortCode,
      shortUrl: `${process.env.BASE_URL}/${u.shortCode}`,
      originalUrl: u.originalUrl,
      clicks: u.clicks,
      isActive: u.isActive,
      createdAt: u.createdAt,
    })),
  });
});

export const deleteUrl = asyncHandler(async (req, res) => {
  const url = await Url.findById(req.params.id);

  if (!url) {
    throw new ApiError(404, "URL not found");
  }
  if (url.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You do not own this URL");
  }

  await url.deleteOne();

  res.status(200).json({
    success: true,
    message: "URL deleted",
  });
});
