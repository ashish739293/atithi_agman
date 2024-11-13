export default function Main () {
  return (
    <>
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center h-screen flex items-center justify-center shadow-black-soft" 
        style={{ backgroundImage: "url('food.jpeg')" }} 
        id="what-we-offer"
      >
        <div className="text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-yellow-500">
            Organize Your Events With 0% Food Wastage
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 text-center px-6 md:px-12 lg:px-16 mx-auto">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="m-8 sm:m-12 lg:m-16 py-8 sm:py-12 lg:py-16 px-6 sm:px-8 lg:px-16 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-yellow-500 text-left">
          We Manage Events In 4 Steps
        </h2>
        <div className="text-left grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: '1. ', text: 'Connect with us' },
            { title: '2. ', text: 'Send Invites' },
            { title: '3. ', text: 'Receive Response' },
            { title: '4. ', text: 'Final list of guests' },
          ].map((step, index) => (
            <div key={index} className="p-4 text-yellow-500">
              <span className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 block">{step.title}</span>
              <span className="text-base sm:text-lg md:text-xl">{step.text}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 text-left text-base sm:text-lg md:text-xl lg:text-2xl px-4 sm:px-6 lg:px-12 mx-auto max-w-4xl">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a 
          type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been 
          the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled 
          it to make a type specimen book.
        </div>
      </section>
    </>
  );
}
