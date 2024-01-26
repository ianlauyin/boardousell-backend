class WishlistController {
  constructor(db) {
    this.wishlist = db.wishlist;
    this.user = db.user;
    this.product = db.product;
  }

  getWishlists = async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await this.user.findByPk(userId);
      const wishlists = await user.getWishlists({
        attributes: ["id"],
        include: [{ model: this.product, attributes: ["name", "stocks"] }],
      });
      return res.json(wishlists);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  //   addWishItem = async (req,res)=>{
  //     const {userEmail,productId } = req.body
  //     try{
  //       await this.wishlist.create({})
  //     }catch(error){
  //       return res.status(400).json({error:true,msg:error})
  //     }
  //   }
}

module.exports = WishlistController;
