import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect } from "react";
import Loader from "../../components/Loader";
import Image from "next/image";
import signin from "../../assets/img/spotyghost_logo.svg";

function Signin({ providers }) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  if (session) return <Loader />;

  return (
    <div className="bg-[#161728] h-screen flex flex-col items-center">
      <Head>
        <title>Login - Spotify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='wrap-logo flex w-screen justify-center items-center h-screen flex-col'>
            <h1 className='text-[3rem] text-white flex items-center'>
                SpotyGhost
                <span className=' ml-2'>
                    <Image src={ signin } width={45} height={45} objectFit="contain"/>
                </span>
            </h1>
            {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="text-white py-1 px-6 rounded-full bg-[#1db954] transition duration-300 ease-out border border-transparent uppercase font-bold text-xs md:text-base tracking-wider hover:scale-105 hover:bg-[#0db146]"
            onClick={() => signIn(provider.id)}
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
        </div>

    </div>
  );
}

export default Signin;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}