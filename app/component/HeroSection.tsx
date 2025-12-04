import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section id="hero" className=" px-10 sm:px-20  mt-10">
      <div className="text-center">
            <h1 className="text-2xl sm:text-7xl text-[#a45ca9]">Powerful Invoicing Platform <br/> for Your Business</h1>
            <p className="text-[#dcb6dc] mt-5 sm:text-lg mb-10">Our user-friendly invoicing platform designed to revolutionized the way you handle <br/>
            your invoicing tasks with our intuitive interface and powerful features.</p>
            <Link  href="/SignIn" className="mt-10  bg-[#222020] shadow-xl p-4 text-[#f7f7f7] rounded-xl text-lg ">
                Create Invoice
            </Link>

            <Image
            src="/logo.png"
            alt="Hero Image"
            width={800}
            height={600}
            className="mx-auto mt-10"
          />
        </div>
        {/* about section */}

        <div id="about" className="mt-10">
          <h1 className="text-[#a45ca9] text-2xl font-bold">About Us</h1>
          <p className="">we </p>
        </div>

        {/* feature section */}
        <div id="feature" className="mt-10">
          <h1 className="text-[#a45ca9] text-2xl font-bold">Feature</h1>
          <p className="">we </p>
        </div>

    </section>
  );
}