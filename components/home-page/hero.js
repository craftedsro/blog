import classes from "./hero.module.css";
import Image from "next/image";
const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/milan.png"
          alt="An image showing Milan"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi I am Milan</h1>
      <p>I blog about web development - most of React</p>
    </section>
  );
};

export default Hero;
