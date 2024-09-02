import FooterBg from '../assets/FooterBg.png'; // Assuming FooterBg is a valid image file

const Footer = () => {
  return (
    <footer
      style={{
        backgroundImage: `url(${FooterBg})`,
        backgroundSize: 'cover',   // Adjusts the background image to cover the entire footer
        backgroundPosition: 'center', // Centers the background image
      }}
    >
      Footer
    </footer>
  );
}

export default Footer;
