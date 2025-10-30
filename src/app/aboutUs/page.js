import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import Qiftly from "../../assets/images/Qiftly_Gifts_qiftlyabout-hero.png"
import Qiftly_Story from "../../assets/images/Qiftly_Story.png"

export default function AboutUsPage({ brandName = 'Qiftly' }) {
    const pageTitle = `${brandName} | Gift & Home Décor in Qatar`
    const pageDescription = `${brandName} offers thoughtful gifts and elegant home décor in Qatar. Discover custom mugs, Islamic wall art, and personalized items that make every moment special.`
    const pageUrl = 'https://qiftly.com/about'

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta name="keywords" content="Qiftly, gift shop Qatar, home decor Qatar, Islamic gifts, personalized mugs, custom gifts Doha" />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:image" content="https://qiftly.com/images/about-hero.jpg" />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>

            <main className="min-h-screen bg-gray-50 text-gray-800 p-4 sm:p-8 md:p-12 font-roboto">
                <section className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col lg:flex-row">

                    {/* Left: Hero + Text */}
                    <div className="flex-1 p-6 lg:p-12 flex flex-col justify-center gap-6">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold" style={{ fontFamily: 'var(--font-poppins)' }}>{brandName}</h1>
                        <p className="mt-2 text-gray-600">Thoughtful Gifts, Beautiful Homes — Our mission is to make every moment memorable.</p>

                        <p className="mt-4 text-gray-700">
                            {brandName} is a Qatar-based gift and home décor brand. We offer custom gift items such as mugs, frames, cushions, and stylish décor for your home. Each design is created with Islamic values and aesthetic beauty in mind.
                        </p>

                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            <li className="flex items-start gap-3">
                                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>1</span>
                                <div>
                                    <h4 className="font-semibold">Customized Gifts</h4>
                                    <p className="text-sm text-gray-600">Personalized mugs, keychains, cushions, and more.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>2</span>
                                <div>
                                    <h4 className="font-semibold">Home Décor</h4>
                                    <p className="text-sm text-gray-600">Wall art, table décor, LED lights — stylish items to beautify your home.</p>
                                </div>
                            </li>
                        </ul>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <a href="/shop" className="px-5 py-2 rounded-lg shadow-sm font-medium text-white" style={{ backgroundColor: 'var(--color-primary)' }}>Shop Products</a>
                            <a href="/contact" className="px-5 py-2 rounded-lg border font-medium" style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}>Contact Us</a>
                        </div>
                    </div>

                    {/* Right: Image */}
                    <div className="flex-1 relative h-64 sm:h-80 md:h-full text-center">
                        <div className='flex w-full justify-center items-center'>
                            <Image
                                src={Qiftly}
                                alt={`${brandName} hero`}
                                style={{ objectFit: 'cover' }}
                                className="rounded-2xl"
                            />
                        </div>
                    </div>
                </section>

                {/* Values / Mission */}
                <section className="max-w-7xl mx-auto mt-16 px-4 sm:px-8 lg:px-12">
                    {/* Mission, Values, Responsibility */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Our Mission",
                                text: "To make small moments in life special with beautiful, high-quality, and Islamic-friendly gifts.",
                                icon: "🎯",
                            },
                            {
                                title: "Our Values",
                                text: "Integrity, customer-first service, and high-quality products are our top priorities.",
                                icon: "💎",
                            },
                            {
                                title: "Social Responsibility",
                                text: "We promote products aligned with social and religious values. Haram products are listed solely for awareness purposes.",
                                icon: "🌱",
                            },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-2xl shadow-lg transform transition-transform hover:-translate-y-2 hover:shadow-2xl text-center"
                            >
                                <div className="text-4xl mb-4">{item.icon}</div>
                                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                <p className="text-gray-700 text-sm">{item.text}</p>
                            </div>
                        ))}
                    </div>

                    {/* Our Story */}
                    <div className="mt-16 relative max-w-3xl mx-auto bg-indigo-50 rounded-3xl p-10 shadow-lg flex flex-col md:flex-row items-center gap-6">
                        <div className="text-center md:text-left flex-1">
                            <h4 className="text-2xl font-bold mb-3">Our Story</h4>
                            <p className="text-gray-700">
                                Qiftly started small — simply with the desire to make a customer happy. Now, we focus on each product to bring joy and peace to every home.
                            </p>
                        </div>
                        <div className="flex-1 text-center md:text-right">
                            <div className='flex items-center justify-center'>
                                <Image
                                    src={Qiftly_Story}
                                    alt="Our Story Illustration"
                                    width={250}
                                    height={250}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact / Shop */}
                    <div className="mt-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-2 text-center md:text-left">
                            <h5 className="text-lg font-semibold">Contact / Location</h5>
                            <p className="text-gray-600">Based in Qatar — our focus is online first; you can also meet us in person for orders.</p>
                            <p className="text-gray-600">Email: qiftly1@gmail.com</p>
                        </div>
                        <div className="text-center md:text-right">
                            <a
                                href="/"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold shadow-lg text-white"
                                style={{ background: 'var(--color-primary)' }}
                            >
                                🛒 View Shop
                            </a>
                        </div>
                    </div>
                </section>


                <footer className="max-w-7xl mx-auto mt-12 text-center text-xs text-gray-500">© {new Date().getFullYear()} {brandName} — All rights reserved.</footer>
            </main>
        </>
    )
}
