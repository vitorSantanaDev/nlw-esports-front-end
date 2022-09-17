import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { MagnifyingGlassPlus } from "phosphor-react";

const CreateAdBanner = () => {
  return (
    <div className="pt-1 bg-nlw-gradient self-stretch mt-8 rounded-lg overflow-hidden">
      <div className="bg-[#2A2634] px-8 py-6 flex items-center justify-between">
        <div>
          <strong className="text-2xl text-white font-black block">
            Não encontrou seu duo?
          </strong>
          <span className="text-zinc-400">
            Publique um anúncio para encontrar novos players!
          </span>
        </div>
        <Dialog.Trigger>
          <button className="py-3 px-4 flex items-center gap-3 bg-violet-500 hover:bg-violet-600 text-white rounded">
            Publicar anúncio <MagnifyingGlassPlus size={24} />
          </button>
        </Dialog.Trigger>
      </div>
    </div>
  );
};

export default CreateAdBanner;
