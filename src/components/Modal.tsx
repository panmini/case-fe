import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 overflow-y-auto">
			<div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
				<div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />

				<div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
					<div className="absolute top-0 right-0 pt-4 pr-4">
						<button
							onClick={onClose}
							className="text-gray-400 hover:text-gray-600 focus:outline-none"
						>
							<X size={24} />
						</button>
					</div>

					<div className="sm:flex sm:items-start">
						<div className="w-full mt-3 text-center sm:mt-0 sm:text-left">
							<h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
								{title}
							</h3>
							{children}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
