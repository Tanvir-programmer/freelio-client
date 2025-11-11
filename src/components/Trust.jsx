import React from 'react';

const Trust = () => {
    return (
        <section className="trust-section max-w-4xl mx-auto my-8 px-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Trust Freelio</h2>
            <p className="text-gray-600 mb-6">
                Freelio is designed to enable secure, reliable collaborations between clients and professionals. We combine verification,
                secure payments, transparent feedback, and dedicated support to protect your projects at every stage.
            </p>

            <ol className="list-decimal list-inside space-y-4 text-gray-700" style={{ lineHeight: 1.7 }}>
                <li>
                    <strong>Verified profiles</strong> — All accounts undergo verification to ensure authenticity and reduce the risk of
                    fraudulent activity.
                </li>
                <li>
                    <strong>Secure payments</strong> — Funds are held in escrow until project milestones are approved, protecting both
                    clients and freelancers.
                </li>
                <li>
                    <strong>Transparent reviews & ratings</strong> — Public feedback helps you evaluate past performance and make informed
                    hiring decisions.
                </li>
                <li>
                    <strong>Dedicated support</strong> — Our support team is available to help resolve disputes and provide timely assistance
                    when needed.
                </li>
                <li>
                    <strong>Skill-based matching</strong> — Intelligent matching connects you with professionals whose skills and experience
                    fit your project requirements.
                </li>
                <li>
                    <strong>Data privacy & security</strong> — We apply industry-standard encryption and strict access controls to protect
                    your data and project files.
                </li>
                <li>
                    <strong>Professional community</strong> — Join a growing network of vetted professionals committed to delivering
                    high-quality work and building lasting relationships.
                </li>
            </ol>
        </section>
    );
};

export default Trust;