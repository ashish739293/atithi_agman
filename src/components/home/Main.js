export default function Main (){

    return(
        <>
        <section className="relative bg-cover bg-center h-screen flex items-center justify-center shadow-black-soft" style={{ backgroundImage: "url('food.jpeg')" }} id='what-we-offer'>
        <div className="text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl md:text-4xl font-bold mb-4 text-yellow-500">Organize Your Events With 0% Food Wastage</h1>
          <p className="text-lg mb-8 text-center pl-12 pr-12 ml-40 mr-40">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="m-16 py-16 px-16 text-center">
        <h2 className="text-left text-3xl font-bold mb-8 text-yellow-500">We Manage Events In 4 Steps</h2>
        <div className="text-left grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: '1. ', text: 'Connect with us' },
            { title: '2. ', text: 'Send Invites' },
            { title: '3. ', text: 'Receive Response' },
            { title: '4. ', text: 'Final list of guests' },
          ].map((step, index) => (
            <div key={index} className="p-2 text-yellow-500">
              <span className="text-4xl font-semibold mb-2">{step.title}</span>
              <span>{step.text}</span>
            </div>
          ))}
        </div>
        <div className='text-left mt-8'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div>
      </section>
        </>
    )

}