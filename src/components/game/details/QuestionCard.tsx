
import { Question, QuestionReponse } from "@/types/game-details";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageIcon, TimerIcon, Check, Clock, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface QuestionCardProps {
  question: Question;
  index: number;
  token: string;
}

export function QuestionCard({ question, index, token }: QuestionCardProps) {
  // Get the image URL
  const imageUrl = question.fichier 
    ? `http://kahoot.nos-apps.com/${question.fichier}`
    : question.image 
      ? `http://kahoot.nos-apps.com/${question.image}`
      : null;

  // Check if reponses is an array of objects (new format) or array of strings (old format)
  const isNewResponseFormat = question.reponses && 
    question.reponses.length > 0 && 
    typeof question.reponses[0] !== 'string';

  // Debug the response format to console
  useEffect(() => {
    console.log(`Question ${index + 1} responses:`, question.reponses);
    console.log(`Question ${index + 1} format:`, isNewResponseFormat ? "New Object Format" : "Old String Format");
  }, [question, index, isNewResponseFormat]);

  return (
    <Card key={index} className="border border-gray-100 shadow-sm hover:shadow-md transition-all">
      <CardHeader className="bg-gray-50 rounded-t-lg">
        <CardTitle className="text-lg flex justify-between items-center">
          <span>Question {index + 1}: {question.libelle}</span>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{question.temps || "30"} sec</span>
            </Badge>
            {question.limite_response ? (
              <Badge variant="success" className="flex items-center gap-1">
                <TimerIcon className="h-3 w-3" />
                <span>Chrono activé</span>
              </Badge>
            ) : (
              <Badge variant="outline" className="flex items-center gap-1">
                <TimerIcon className="h-3 w-3" />
                <span>Sans chrono</span>
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        {/* Question Image */}
        {imageUrl ? (
          <div className="relative w-full h-[200px] rounded-lg overflow-hidden border border-gray-100">
            <img
              src={imageUrl}
              alt={`Image question ${index + 1}`}
              className="object-contain w-full h-full"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-[100px] bg-gray-100 rounded-lg">
            <div className="text-gray-400 flex flex-col items-center">
              <ImageIcon className="w-8 h-8 mb-1" />
              <span className="text-sm">Aucune image</span>
            </div>
          </div>
        )}
        
        {/* Question Answers with Expanded Details */}
        <div className="space-y-4 mt-4">
          <h3 className="font-medium text-base">Réponses possibles:</h3>
          {isNewResponseFormat ? (
            // New response format - reponses is an array of objects with reponse_texte property
            (question.reponses as QuestionReponse[]).map((reponse, rIndex) => {
              if (!reponse) return null;
              
              return (
                <div
                  key={rIndex}
                  className={`p-4 rounded-lg ${
                    reponse.etat
                      ? 'bg-green-50 border-green-200'
                      : 'bg-gray-50 border-gray-100'
                  } border transition-colors`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`${reponse.etat ? 'text-green-700 font-medium' : 'font-medium'}`}>
                      {reponse.reponse_texte || "Réponse sans texte"}
                    </span>
                    {reponse.etat && (
                      <Badge variant="success" className="flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>Correcte</span>
                      </Badge>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Info className="w-3 h-3" /> 
                      <span>ID: {reponse._id}</span>
                    </div>
                    <div>État: {reponse.etat ? "Correcte" : "Incorrecte"}</div>
                    <div>Question ID: {reponse.question}</div>
                    <div>Date: {new Date(reponse.date).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</div>
                    {reponse.__v !== undefined && (
                      <div>Version: {reponse.__v}</div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            // Old response format - reponses is an array of strings
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.isArray(question.reponses) && (question.reponses as string[]).map((reponse, rIndex) => (
                <div
                  key={rIndex}
                  className={`p-4 rounded-lg ${
                    reponse === question.reponse_correcte
                      ? 'bg-green-50 border-green-200'
                      : 'bg-gray-50 border-gray-100'
                  } border transition-colors flex items-center justify-between`}
                >
                  <span className={`${reponse === question.reponse_correcte ? 'text-green-700 font-medium' : ''}`}>
                    {reponse}
                  </span>
                  {reponse === question.reponse_correcte && (
                    <Badge variant="success" className="flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>Correcte</span>
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Question details */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
          <h3 className="font-medium text-base mb-2">Détails de la question:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div><span className="font-medium">ID:</span> {question._id}</div>
            {question.type_fichier && (
              <div><span className="font-medium">Type de fichier:</span> {question.type_fichier}</div>
            )}
            <div><span className="font-medium">Temps:</span> {question.temps || "30"} secondes</div>
            <div><span className="font-medium">Limite de réponse:</span> {question.limite_response ? "Oui" : "Non"}</div>
            
            {question.typeQuestion && (
              <div className="col-span-2">
                <span className="font-medium">Type de question:</span> {question.typeQuestion.libelle}
                {question.typeQuestion.description && (
                  <div className="text-xs text-gray-500 mt-1">{question.typeQuestion.description}</div>
                )}
              </div>
            )}
            
            {question.point && (
              <div className="col-span-2">
                <span className="font-medium">Points:</span> {question.point.valeur || 0}
                {question.point.nature && (
                  <span className="ml-2 text-xs">({question.point.nature})</span>
                )}
                {question.point.description && (
                  <div className="text-xs text-gray-500 mt-1">{question.point.description}</div>
                )}
              </div>
            )}
            
            {question.date && (
              <div className="col-span-2">
                <span className="font-medium">Date de création:</span> {new Date(question.date).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
