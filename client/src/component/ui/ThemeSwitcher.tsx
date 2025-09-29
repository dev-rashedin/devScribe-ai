import { useTheme } from '../../hooks';
import { FiMoon, IoSunnyOutline } from '../../data/icons';

const ThemeSwitcher = () => {
  const { dark, toggleDark } = useTheme();
  return (
    <button onClick={toggleDark}>
      {dark ? (
        <FiMoon className='text-xl' />
      ) : (
        <IoSunnyOutline className='text-xl' />
      )}
    </button>
  );
};
export default ThemeSwitcher;
