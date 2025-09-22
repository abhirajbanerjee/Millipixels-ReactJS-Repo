import {useMemo, useState } from 'react';
import {Contact} from '../Data/Contacts';
import {Contacts} from '../Data/Contacts';

export const ContactDataRenderer = () => {
    const [query, setQuery] = useState('');
    
    const visibleContacts: Contact[] = useMemo(() => {
        if(!query.trim()) return Contacts;
        const keyword = query.toLowerCase();
        return Contacts.filter(
            ({name, email }) =>
                name.toLowerCase().includes(keyword) || email.toLowerCase().includes(keyword)
        );

}, [query]);

    return (
        <div className ="container">
            <header>
                <h1 className="Title">Contact List</h1>
            </header>
            <div className="filter-section">
                <input className="filter-input"
                type ="search"
                placeholder="Search by name or email"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label = "Search Contacts"
                />
                </div>
                <div className="contacts-grid">
                    {visibleContacts.length > 0 ? (visibleContacts.map(({id, name, email, phone}) => (
                        <article key={id} className = "contact-card">
                            <h2 className="contact-name">{name}</h2>
                            <h2 className="contact-email">{email}</h2>
                            <h2 className="contact-phone">{phone}</h2>
                        </article>
                )) 
            ): (
                    <p> No Contacts Found</p>
                )}
            </div>

            <style>
                {`
                .container {
                margin: 0 auto;
                max-width: 900px;
                padding: 20px;
                }
                .title{
                font-size: 2.5rem;
                text-alignL center;
                margin-bottom: 25px;
                background: linear-gradient(90deg, #007bff, #00c6ff);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                font-weight: bold;
                position: relative;
                }
                .title::after{
                content:"";
                display: block;
                width: 80px;
                height: 3px;
                background: #007bff;
                margin: 10px auto 0;
                border-radius: 2px;
                }
                .filter-section{
                display: flex;
                justify-content: center;
                margin-bottom: 20px;
                }
                .filter-input{
                width: 100%;
                max-width: 400px;
                padding: 12px;
                font-size: 16px;
                border: 2px solid #ddd;
                border-radius: 6px;
                outline: none;
                transition: border-color 0.3s;
                }
                .filter-input:focus{
                border-color: #007bff;
                }
                .contacts-grid{
                display: grid;
                gap: 20px;
                grid-template-columns: repeat(auto-fill,minmax(250px, 1fr));
                }
                .contact-card{
                background: #ffffff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                transtion: transform 0.2s, box-shadow 0.2s;
                }
                .contact-card:hover{
                transform: translateY(-4px);
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
                }
                .contact-name{
                font-size: 1.2rem;
                font-weight: bold;
                color: #333;
                margin-bottom: 8px;
                }
                .contact-email,
                .contact-phone{
                margin: 4px 0;
                color: #555;
                font-size: 0.95rem;
                }
                `}
            </style>
        </div>
            );
        };