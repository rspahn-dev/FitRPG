
import { monsters } from '@/lib/data';
import BattleClient from './battle-client';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return monsters.map((monster) => ({
    monsterId: monster.id,
  }));
}

const getMonster = (id: string) => {
    return monsters.find(m => m.id === id);
}

export default function BattleArenaPage({ params }: { params: { monsterId: string } }) {
  const monster = getMonster(params.monsterId);

  if (!monster) {
    notFound();
  }

  return <BattleClient monster={monster} />;
}
