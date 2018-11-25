const { forwardTo } = require("prisma-binding");
const { hasPermission } = require("../utils");

const Query = {
  items: forwardTo("db"),
  item: forwardTo("db"),
  itemsConnection: forwardTo("db"),
  async me(parent, args, ctx, info) {
    // check if there is a current user ID
    if (!ctx.request.userId) {
      return null;
    }
    let user = await ctx.db.query.user(
      { where: { id: ctx.request.userId } },
      info
    );
    let deletedItemsInCart = user.cart
      .filter(item => !item.item)
      .map(item => item.id);
    await ctx.db.mutation.deleteManyCartItems({
      where: {
        id_in: deletedItemsInCart
      }
    });

    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId }
      },
      info
    );
  },
  
  async users(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error("Sorry! But you must login");
    }
    hasPermission(ctx.request.user, ["ADMIN", "PERMISSIONUPDATE"]);

    return ctx.db.query.users({}, info);
  },

  async order(parent, args, ctx, info) {
    if (!ctx.request.userId) throw new Error("You are not logged in!");

    const order = await ctx.db.query.order({ where: { id: args.id } }, info);
    const ownsOrder = order.user.id === ctx.request.userId;
    const hasPermissionToSeeOrder = ctx.request.user.permissions.includes(
      "ADMIN"
    );
    if (!ownsOrder || !hasPermissionToSeeOrder) {
      throw new Error("You cant see this!!!");
    }
    return order;
  },

  async orders(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error("You must be signed in!");
    }

    return ctx.db.query.orders(
      {
        where: {
          user: { id: userId }
        }
      },
      info
    );
  }
};

module.exports = Query;
