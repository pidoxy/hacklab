import amico from '../images/amico.svg';

export default function Home() {
  const cards = [
    {
      name: `Secure Your Phone`,
      text: `Our AI will optimize the front camera of your phone
    to protect your phone from imposed threat.`,
    },
    {
      name: "Secure Your Car",
      text: `With the aid of cameras and sensors nstalled in your cars
    Our AI will alert you when an unregistered face enters your car.`,
    },
    {
      name: "Secure Your House",
      text: `Smart houses too will benefit from our AI product,you will 
    have more control over the security system in your house.`,
    },
  ];

  const advancedFeatures = [
    { img: `./assets/5g.svg`, text: `5G LITE connectivity` },
    {
      img: `./assets/ai.svg`,
      text: `AI Integration for
    survelliance and alert`,
    },
    { img: `./assets/padlock.svg`, text: `Anti theft in built system` },
    {
      img: `./assets/edge.svg`,
      text: `Edge 
    Computing`,
    },
    {
      img: `./assets/system.svg`,
      text: `Multiple Security
    System`,
    },
    { img: `./assets/chrome.svg`, text: `Chrome Integration` },
  ];
  return (
    <>
      <div className="App-background h-5/6 flex ">
        <div className="text-white text-left space-y-5 px-5 my-auto ">
          <h1 className="md:text-4xl text-xl font-extrabold text-white">
            PheraCAM AI | Facial Recognition
          </h1>

          <p className="md:text-2xl text-base  md:font-bold font-medium">
            AI-Based Security and protection System that uses
            <br /> facial recognition and edge computing to alert
            <br /> you when an unregistered face is detected.
          </p>

          <div className="space-x-5">
            <a
              href="/signup"
              className="ml-8 inline-flex items-center justify-center px-8 py-3 bg-white shadow-sm font-bold md:text-lg text-lihb "
            >
              Sign up
            </a>
            <a
              href="login"
              className=" text-white outline outline-white font-bold md:text-lg px-8 py-3 hover:text-gray-900"
            >
              Log in
            </a>
          </div>
        </div>
      </div>
      <div className="text-lihb text-center px-5 py-5 ">
        <h1 className="md:text-3xl text-xl font-bold text-lihb">
          Introducing Our security AI that can
        </h1>

        <div className="md:space-x-5 space-x-0 space-y-5 md:space-y-0 flex flex-col md:flex-row justify-center py-5">
          {cards.map((card, index) => (
            <div
              key={index}
              className="md:w-1/3 h-96 py-10 rounded text-white bg-lihb overflow-hidden shadow-lg"
            >
              <div className="px-6 py-4">
                <div className="font-bold pb-3 text-xl mb-2">{card.name}</div>
                <p className="text-gray-700 pb-3 text-base">{card.text}</p>
              </div>
              <a
                href="/learn-more"
                className=" bg-white text-lihb font-bold md:text-lg px-8 py-3 hover:text-gray-900"
              >
                Learn more
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="md:space-x-5 space-x-0 space-y-5 md:space-y-0 px-2 flex flex-col md:flex-row justify-center py-5">
        <div className="w-1/2 flex mx-auto justify-center">
          <img className="mx-auto" src={amico} alt="ai" />
        </div>
        <div className="md:text-left flex flex-col md:w-1/2">
          <p className="text-lg my-auto">
            
            It is an AI-Based Security and protection System that uses
facial recognition and edge computing to alert you when
an unregistered face is detected (maybe in your home or vehicle), causing you to make 
necessary actions when your property is posed to a threat.
Everyone wants to be secured or let’s say have some sort
of security including our users.
We understand that our users want to enjoy what they’ve have worked for and we are using this product to improve the security and privacy of our users by effectively using of the IOT devices Powered by AI, to protect their property against theft and crime.
Hence, we can make our users sleep better at night.
            
            
            
            
            
            
            
          </p>
          <a
            href="/learn-more"
            className="md:w-1/3 bg-lihb text-white font-bold md:text-lg px-8 py-3 hover:text-gray-900"
          >
            Learn more
          </a>
        </div>
      </div>

      <div className="text-lihb text-center px-5 pt-2 pb-20 ">
        <h1 className="md:text-3xl pt-20 pb-10 text-xl font-bold text-lihb">
          Advanced Features that will ensure true security and safety{" "}
        </h1>

        <div className="grid md:grid-cols-3 place-items-center gap-4 space-y-5 py-5">
          {advancedFeatures.map((card, index) => (
            <div
              key={index}
              className=" h-80 w-64 py-5 rounded text-lihb bg-white outline outline-lihb overflow-hidden shadow-lg"
            >
              <div className="px-6 py-4 flex flex-col space-y-10">
                <img className="m-auto" src={card.img} alt={card.text} />
                <p className="text-gray-700 font-bold pb-3 text-lg">
                  {card.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
