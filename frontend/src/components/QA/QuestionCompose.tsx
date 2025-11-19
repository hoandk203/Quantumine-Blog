'use client';

import React, { useState, useRef } from 'react';
import { X, Minimize2, Maximize2, Paperclip, Image as ImageIcon, Link2, Send, Bold, Italic, List, Hash } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { createQuestion } from '../../services/QAService';
import { CreateQuestionDto } from '../../types/qa.types';
import TiptapEditor from '../Editor/TiptapEditor';
import { toast } from 'react-toastify';

interface QuestionComposeProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const QuestionCompose: React.FC<QuestionComposeProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form states
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast.error('Vui lòng nhập đầy đủ tiêu đề và nội dung');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const questionData: CreateQuestionDto = {
        title: title.trim(),
        content: content.trim(),
      };

      await createQuestion(questionData);
      
      // Reset form
      setTitle('');
      setContent('');
      setAttachments([]);
      
      onClose();
      onSuccess?.();
    } catch (error: any) {
      console.error('Error creating question:', error);
      // Extract error message from Axios error response
      const errorMessage = error?.response?.data?.message
        || error?.message
        || 'Có lỗi xảy ra khi đặt câu hỏi';
      toast.error(Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const modalClasses = `
    fixed z-50 transition-all duration-300 ease-in-out
    ${isMinimized 
        ? 'bottom-0 right-4 w-80 h-12' 
        : 'bottom-0 right-4 w-[600px] max-w-[90vw] h-[600px] max-h-[80vh]'
    }
  `;

  return (
    <>
      {/* Modal */}
      <div className={modalClasses}>
        <div className="bg-white dark:bg-gray-800 rounded-t-lg border border-gray-200 dark:border-gray-700 shadow-2xl h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-t-lg">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {isMinimized ? 'Đặt câu hỏi' : 'Soạn câu hỏi mới'}
            </h3>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-8 w-8 p-0 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          {!isMinimized && (
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
              {/* Title Input */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <Input
                  placeholder="Tiêu đề câu hỏi..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border-none bg-transparent text-lg font-medium focus:ring-0 focus:border-none p-0 px-2"
                  maxLength={255}
                />
              </div>

              <TiptapEditor
                content={content}
                onChange={setContent}
                className='h-[400px]'
                type='question'
              />

              {/* Attachments */}
              {attachments.length > 0 && (
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Tệp đính kèm:</h4>
                  <div className="space-y-2">
                    {attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded p-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{file.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAttachment(index)}
                          className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Hỗ trợ Markdown • 255 ký tự
                </div>
                <div className="flex gap-2">
                  <Button type="button" variant="ghost" onClick={onClose} disabled={isSubmitting}>
                    Hủy
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={!title.trim() || !content.trim() || isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Đang gửi...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default QuestionCompose; 