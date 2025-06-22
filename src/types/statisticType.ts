import type { CivType } from "./civType"

export type StatisticType = {
    total_spend_galactic : number,
    rows_affected : number,
    less_spent_at : number,
    big_spent_at : number,
    less_spent_value : number,
    big_spent_value : number,
    average_spend_galactic : number,
    big_spent_civ : CivType,
    less_spent_civ : CivType,
}

export function isStatisticType(data: unknown): data is StatisticType {
  return (
    typeof data === 'object' && data !== null &&
    'total_spend_galactic' in data && typeof data.total_spend_galactic === 'number' && data.total_spend_galactic >= 0 &&
    'rows_affected' in data && typeof data.rows_affected === 'number' && data.rows_affected >= 0 && 
    'less_spent_at' in data && typeof data.less_spent_at === 'number' &&  0 <= data.less_spent_at && data.less_spent_at <= 364 &&
    'big_spent_at' in data && typeof data.big_spent_at === 'number' && 0 <= data.big_spent_at && data.big_spent_at <= 364 &&
    'less_spent_value' in data && typeof data.less_spent_value === 'number' && data.less_spent_value >= 0 && 
    'big_spent_value' in data && typeof data.big_spent_value === 'number' && data.big_spent_value >= 0 && 
    'average_spend_galactic' in data && typeof data.average_spend_galactic === 'number' && data.average_spend_galactic >= 0 && 
    'big_spent_civ' in data && (data.big_spent_civ === 'humans' || data.big_spent_civ === 'monsters' || data.big_spent_civ === 'blobs') &&
    'less_spent_civ' in data && (data.less_spent_civ === 'humans' || data.less_spent_civ === 'monsters' || data.less_spent_civ === 'blobs')
  );
}