import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import logo from '../assets/Logo.png';
import { FaCommentDots, FaTimes, FaPaperPlane, FaExpand, FaCompress } from 'react-icons/fa';

const SERVICES = {
    "Digital Marketing": [
        "Affiliate Marketing",
        "Email Marketing",
        "Display Ad Serving",
        "SEO",
        "SEM - Paid Ads",
        "Social media marketing",
    ],
    "Real Estate & Mortgage": [
        "Junior Processor",
        "Junior Underwriter",
        "Assistant Loan Officer",
        "Lead Generation",
    ],
    "IT Solutions": [
        "Machine Learning Engineer (AI/ML Engineer)",
        "Data Scientist",
        "AI Research Scientist",
        "Computer Vision Engineer",
        "Natural Language Processing (NLP) Engineer",
    ],
};

const CONTACT_LOCATIONS = [
    "Silicon Valley",
    "Orange County",
    "Hyderabad, India",
];

const Chatbot = () => {
    const [showChat, setShowChat] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { text: "Hi! I'm the Consultixs Assistant 🤖\nHow can I help you today?", sender: "bot" }
    ]);
    const [showServiceButtons, setShowServiceButtons] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [showSubServiceButtons, setShowSubServiceButtons] = useState(false);
    const [showContactButtons, setShowContactButtons] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (isMaximized) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMaximized]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = async (msgText, isFromUser = true) => {
        if (!msgText.trim()) return;

        if (isFromUser) {
            setMessages(prev => [...prev, { text: msgText, sender: 'user' }]);
            setInput('');
        }

        const lowerMsg = msgText.toLowerCase();

        if (
            lowerMsg.includes("services") ||
            lowerMsg.includes("service") ||
            lowerMsg.includes("solutions")
        ) {
            setShowServiceButtons(true);
            setSelectedService(null);
            setShowSubServiceButtons(false);
            setShowContactButtons(false);
            setMessages(prev => [...prev, { text: "Please choose from our range of professional services below:", sender: "bot" }]);
            return;
        }

        if (
  lowerMsg.includes("office") ||
  lowerMsg.includes("contact") ||
  lowerMsg.includes("address") ||
  lowerMsg.includes("location")
) {
            setShowContactButtons(true);
            setShowServiceButtons(false);
            setSelectedService(null);
            setShowSubServiceButtons(false);
            setMessages(prev => [...prev, { text: "Please select one of our office locations to know more details:", sender: "bot" }]);
            return;
        }

        if (showServiceButtons && SERVICES[msgText]) {
            setSelectedService(msgText);
            setShowSubServiceButtons(true);
            setShowServiceButtons(false);
            setShowContactButtons(false);
            setMessages(prev => [...prev, { text: `You’ve chosen ${msgText}. Please select the specific area you’re interested in:`, sender: "bot" }]);
            return;
        }

        if (showSubServiceButtons && selectedService && SERVICES[selectedService].includes(msgText)) {
            setShowServiceButtons(false);
            setShowSubServiceButtons(false);
            setShowContactButtons(false);
            try {
                setIsTyping(true);
                const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/chat`, { message: msgText });
                setMessages(prev => [...prev, { text: res.data.reply, sender: "bot" }]);
            } catch (err) {
                setMessages(prev => [...prev, { text: "Sorry, something went wrong.", sender: "bot" }]);
            } finally {
                setIsTyping(false);
            }
            return;
        }

        if (showContactButtons && CONTACT_LOCATIONS.includes(msgText)) {
            setShowContactButtons(false);
            setShowServiceButtons(false);
            setShowSubServiceButtons(false);
            try {
                setIsTyping(true);
                const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/chat`, { message: msgText });
                setMessages(prev => [...prev, { text: res.data.reply, sender: "bot" }]);
            } catch (err) {
                setMessages(prev => [...prev, { text: "Sorry, something went wrong.", sender: "bot" }]);
            } finally {
                setIsTyping(false);
            }
            return;
        }

        setShowServiceButtons(false);
        setShowSubServiceButtons(false);
        setShowContactButtons(false);

        try {
            setIsTyping(true);
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/chat`, { message: msgText });
            setMessages(prev => [...prev, { text: res.data.reply, sender: "bot" }]);
        } catch (err) {
            setMessages(prev => [...prev, { text: 'Sorry, something went wrong.', sender: 'bot' }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {showChat ? (
                <div className={`flex flex-col shadow-xl overflow-hidden bg-[#EFF6FF] border-2 border-[#1E3A8A]
          transition-all duration-300 ease-in-out transform-gpu origin-bottom-right
          ${isMaximized
                        ? 'fixed inset-0 scale-100 rounded-none'
                        : 'fixed bottom-6 right-6 w-[340px] h-[500px] scale-95 rounded-xl'
                    }`}
                >
                    <div className="flex items-center justify-between px-4 py-3 bg-[#1E3A8A] text-white">
                        <div className="flex items-center space-x-2">
                            <img src={logo} alt="Consultixs Logo" className="h-8 w-auto object-contain" />
                            <h2 className="text-lg font-semibold">Consultixs Chat</h2>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button onClick={() => setIsMaximized(!isMaximized)} className="hover:text-gray-200">
                                {isMaximized ? <FaCompress size={18} /> : <FaExpand size={18} />}
                            </button>
                            <button onClick={() => setShowChat(false)} className="hover:text-red-300">
                                <FaTimes size={20} />
                            </button>
                        </div>
                    </div>

                    <div ref={chatContainerRef} className="flex-1 px-4 py-3 space-y-3 overflow-y-auto text-sm text-[#1E3A8A]">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`p-2 rounded-lg border border-[#1E3A8A] max-w-[75%] shadow-sm whitespace-pre-wrap
                  ${msg.sender === 'bot' ? 'bg-white' : 'bg-[#3B82F6] text-white'}
                `}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="italic text-sm text-[#1E3A8A]">Consultixs is typing...</div>
                        )}

                        {showServiceButtons && (
                            <div className="flex flex-col gap-2 mt-2 w-[60%] max-w-xs">
                                {Object.keys(SERVICES).map(service => (
                                    <button key={service} onClick={() => sendMessage(service, false)}
                                        className="bg-[#1E40AF] text-white rounded px-3 py-2 text-xs hover:bg-[#1E3A8A] shadow-md">
                                        {service}
                                    </button>
                                ))}
                            </div>
                        )}

                        {showSubServiceButtons && selectedService && (
                            <div className="flex flex-col gap-2 mt-2 w-[60%] max-w-xs">
                                {SERVICES[selectedService].map(subService => (
                                    <button key={subService} onClick={() => sendMessage(subService, false)}
                                        className="bg-[#1E40AF] text-white rounded px-3 py-2 text-xs hover:bg-[#1E3A8A] shadow-md">
                                        {subService}
                                    </button>
                                ))}
                            </div>
                        )}

                        {showContactButtons && (
                            <div className="flex flex-col gap-2 mt-2 w-[60%] max-w-xs">
                                {CONTACT_LOCATIONS.map(location => (
                                    <button key={location} onClick={() => sendMessage(location, false)}
                                        className="bg-[#1E40AF] text-white rounded px-3 py-2 text-xs hover:bg-[#1E3A8A] shadow-md">
                                        {location}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center px-3 py-2 border-t border-[#1E3A8A] bg-[#EFF6FF] space-x-2">
                        <input
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') sendMessage(input); }}
                            placeholder="Type your message..."
                            className="flex-1 px-3 py-2 rounded-md border border-[#1E3A8A] bg-white text-[#1E3A8A] focus:outline-none"
                        />
                        <button
                            onClick={() => sendMessage(input)}
                            className="p-2 bg-[#1E3A8A] text-white rounded-md hover:bg-[#2563EB] transition"
                        >
                            <FaPaperPlane />
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setShowChat(true)}
                    className="bg-[#1E3A8A] text-white p-4 rounded-full shadow-lg hover:scale-105 transition"
                >
                    <FaCommentDots size={22} />
                </button>
            )}
        </div>
    );
};

export default Chatbot;
