import { GradientModel } from "./models/Gradient";
import { CreateGradientResponse, GetGradientsReturn } from "./utils/types";

export const resolvers = {
  Query: {
    getGradients: async (
      _parent: any,
      { input }: any,
      _context: any,
      _info: any
    ): Promise<GetGradientsReturn> => {
      const { cursor, tags, limit } = input;
      const findArgs: any = {};
      let next = null;

      if (cursor) {
        findArgs._id = { $lt: cursor };
      }
      if (tags.length > 0) {
        findArgs.tags = { $in: tags };
      }

      const results = await GradientModel.find(findArgs)
        .limit(limit + 1)
        .sort({ _id: "desc" });

      if (results.length == limit + 1) {
        next = results[limit - 1]._id;
      }

      return {
        results: results.slice(0, limit),
        next,
      };
    },
  },

  Mutation: {
    createGradient: async (
      _parent: any,
      { input }: any,
      _context: any,
      _info: any
    ): Promise<CreateGradientResponse> => {
      try {
        const newGradient = new GradientModel(input);
        await newGradient.save();
      } catch (err) {
        console.log(err);
        if (err.message.includes("expected `name` to be unique")) {
          return {
            error: "This name already exists. Please choose a different one.",
          };
        } else if (err.message.includes("expected `colors` to be unique")) {
          const doc = await GradientModel.findOne(
            {
              colors: input.colors,
            },
            "name"
          ).exec();

          return {
            error: `This color combination already exists under the name '${
              doc!.name
            }'.`,
          };
        } else {
          return { error: "Server error. Please try again later." };
        }
      }
      return { completed: true };
    },
  },
};
