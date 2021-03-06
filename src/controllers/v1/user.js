const create = require('../create');
const User = require('../../models/User');
const validators = require('../../validators/user');

module.exports = {
  getProfile: create(async (req, res) => {
    const user = await User.findById(req.user.id).select(
      User.getProfileFields().join(' '),
    );

    res.json({ data: user });
  }),

  updateProfile: create(
    async (req, res) => {
      // eslint-disable-next-line object-curly-newline
      const { name, about, skills, title } = req.body;

      const user = await User.findByIdAndUpdate(
        req.user.id,
        {
          name,
          about,
          title,
          skills,
        },
        { new: true },
      ).select(User.getProfileFields().join(' '));

      res.json({ data: user });
    },
    {
      validation: {
        validators: validators.updateProfile,
        throwError: true,
      },
    },
  ),

  updateSocials: create(
    async (req, res) => {
      const socials = res.locals.inputBody;

      const user = await User.findByIdAndUpdate(
        req.user.id,
        { socials },
        { new: true },
      ).select(User.getProfileFields().join(' '));
      res.json({ data: user });
    },
    {
      validation: {
        validators: validators.updateSocials,
        throwError: true,
      },
      inputs: ['website', 'github', 'linkedin', 'twitter'],
    },
  ),
};
