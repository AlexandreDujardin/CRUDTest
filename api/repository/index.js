import bookRepo from './bookRepo.js';
import userRepo from './userRepo.js';

export default (model) => ({
  bookRepo: bookRepo(model.Book),
  userRepo: userRepo(model.User)
});
