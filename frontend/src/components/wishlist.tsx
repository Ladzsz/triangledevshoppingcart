import type { Product } from '../types/Product';
import { useWishlist } from 'react-use-wishlist';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined';

type Props = {
  product: Product;
};

const LibraryWishlistButton = ({ product }: Props) => {
  const { inWishlist, addWishlistItem, removeWishlistItem } = useWishlist();

  const productId = String(product.id);

  const toggleWishlist = () => {
    if (inWishlist(productId)) {
      removeWishlistItem(productId);
    } else {
      addWishlistItem({
        ...product,
        id: productId, 
      });
    }
  };

  return (
    <button onClick={toggleWishlist} aria-label="Toggle wishlist">
      {inWishlist(productId) ? (
        <Favorite color="error" sx={{ fontSize: 8 }} />
      ) : (
        <FavoriteBorderOutlined sx={{ fontSize: 8 }} />
      )}
    </button>
  );
};


export default LibraryWishlistButton;
