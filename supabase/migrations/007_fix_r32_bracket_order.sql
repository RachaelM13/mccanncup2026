-- Fix R32 match_numbers to reflect bracket draw order (not kickoff chronology).
-- Also rewire next_match_id so adjacent bracket pairs meet in the correct R16 slot.
--
-- Bracket halves:
--   Top  (1-8):  SA/Canada · Netherlands/Morocco · Germany/Paraguay · France/Sweden
--                Belgium/Senegal · USA/Bosnia · Spain/Austria · Portugal/Croatia
--   Bottom (9-16): Brazil/Japan · CIV/Norway · Mexico/Ecuador · England/DR Congo
--                  Switzerland/Algeria · Colombia/Ghana · Australia/Egypt · Argentina/CV

-- ── Step 1: offset all R32 match_numbers to avoid unique-constraint collisions ──
UPDATE matches SET match_number = match_number + 100 WHERE round = 'R32';

-- ── Step 2: assign correct bracket-draw match numbers ──────────────────────────
UPDATE matches SET match_number =  1 WHERE id = '32000000-0000-0000-0000-000000000001'; -- South Africa vs Canada
UPDATE matches SET match_number =  2 WHERE id = '32000000-0000-0000-0000-000000000004'; -- Netherlands vs Morocco
UPDATE matches SET match_number =  3 WHERE id = '32000000-0000-0000-0000-000000000003'; -- Germany vs Paraguay
UPDATE matches SET match_number =  4 WHERE id = '32000000-0000-0000-0000-000000000006'; -- France vs Sweden
UPDATE matches SET match_number =  5 WHERE id = '32000000-0000-0000-0000-000000000009'; -- Belgium vs Senegal
UPDATE matches SET match_number =  6 WHERE id = '32000000-0000-0000-0000-00000000000a'; -- USA vs Bosnia & Herzegovina
UPDATE matches SET match_number =  7 WHERE id = '32000000-0000-0000-0000-00000000000b'; -- Spain vs Austria
UPDATE matches SET match_number =  8 WHERE id = '32000000-0000-0000-0000-00000000000c'; -- Portugal vs Croatia
UPDATE matches SET match_number =  9 WHERE id = '32000000-0000-0000-0000-000000000002'; -- Brazil vs Japan
UPDATE matches SET match_number = 10 WHERE id = '32000000-0000-0000-0000-000000000005'; -- Côte d'Ivoire vs Norway
UPDATE matches SET match_number = 11 WHERE id = '32000000-0000-0000-0000-000000000007'; -- Mexico vs Ecuador
UPDATE matches SET match_number = 12 WHERE id = '32000000-0000-0000-0000-000000000008'; -- England vs DR Congo
UPDATE matches SET match_number = 13 WHERE id = '32000000-0000-0000-0000-00000000000d'; -- Switzerland vs Algeria
UPDATE matches SET match_number = 14 WHERE id = '32000000-0000-0000-0000-000000000010'; -- Colombia vs Ghana
UPDATE matches SET match_number = 15 WHERE id = '32000000-0000-0000-0000-00000000000e'; -- Australia vs Egypt
UPDATE matches SET match_number = 16 WHERE id = '32000000-0000-0000-0000-00000000000f'; -- Argentina vs Cabo Verde

-- ── Step 3: rewire R32 → R16 advancement to match bracket draw ────────────────
-- Adjacent pairs (M1+M2, M3+M4, …) feed the same R16 slot.
-- (M1,M2)→R16-1  (M3,M4)→R16-2  (M5,M6)→R16-3  (M7,M8)→R16-4
-- (M9,M10)→R16-5  (M11,M12)→R16-6  (M13,M14)→R16-7  (M15,M16)→R16-8

UPDATE matches SET next_match_id = '16000000-0000-0000-0000-000000000001', next_match_slot = 'home' WHERE id = '32000000-0000-0000-0000-000000000001'; -- M1  SA/Canada
UPDATE matches SET next_match_id = '16000000-0000-0000-0000-000000000001', next_match_slot = 'away' WHERE id = '32000000-0000-0000-0000-000000000004'; -- M2  Netherlands/Morocco
UPDATE matches SET next_match_id = '16000000-0000-0000-0000-000000000002', next_match_slot = 'home' WHERE id = '32000000-0000-0000-0000-000000000003'; -- M3  Germany/Paraguay
UPDATE matches SET next_match_id = '16000000-0000-0000-0000-000000000002', next_match_slot = 'away' WHERE id = '32000000-0000-0000-0000-000000000006'; -- M4  France/Sweden
UPDATE matches SET next_match_id = '16000000-0000-0000-0000-000000000003', next_match_slot = 'home' WHERE id = '32000000-0000-0000-0000-000000000009'; -- M5  Belgium/Senegal
UPDATE matches SET next_match_id = '16000000-0000-0000-0000-000000000003', next_match_slot = 'away' WHERE id = '32000000-0000-0000-0000-00000000000a'; -- M6  USA/Bosnia
UPDATE matches SET next_match_id = '16000000-0000-0000-0000-000000000004', next_match_slot = 'home' WHERE id = '32000000-0000-0000-0000-00000000000b'; -- M7  Spain/Austria
UPDATE matches SET next_match_id = '16000000-0000-0000-0000-000000000004', next_match_slot = 'away' WHERE id = '32000000-0000-0000-0000-00000000000c'; -- M8  Portugal/Croatia
UPDATE matches SET next_match_id = '16000000-0000-0000-0000-000000000005', next_match_slot = 'home' WHERE id = '32000000-0000-0000-0000-000000000002'; -- M9  Brazil/Japan
UPDATE matches SET next_match_id = '16000000-0000-0000-0000-000000000005', next_match_slot = 'away' WHERE id = '32000000-0000-0000-0000-000000000005'; -- M10 Côte d'Ivoire/Norway
UPDATE matches SET next_match_id = '16000000-0000-0000-0000-000000000006', next_match_slot = 'home' WHERE id = '32000000-0000-0000-0000-000000000007'; -- M11 Mexico/Ecuador
UPDATE matches SET next_match_id = '16000000-0000-0000-0000-000000000006', next_match_slot = 'away' WHERE id = '32000000-0000-0000-0000-000000000008'; -- M12 England/DR Congo
UPDATE matches SET next_match_id = '16000000-0000-0000-0000-000000000007', next_match_slot = 'home' WHERE id = '32000000-0000-0000-0000-00000000000d'; -- M13 Switzerland/Algeria
UPDATE matches SET next_match_id = '16000000-0000-0000-0000-000000000007', next_match_slot = 'away' WHERE id = '32000000-0000-0000-0000-000000000010'; -- M14 Colombia/Ghana
UPDATE matches SET next_match_id = '16000000-0000-0000-0000-000000000008', next_match_slot = 'home' WHERE id = '32000000-0000-0000-0000-00000000000e'; -- M15 Australia/Egypt
UPDATE matches SET next_match_id = '16000000-0000-0000-0000-000000000008', next_match_slot = 'away' WHERE id = '32000000-0000-0000-0000-00000000000f'; -- M16 Argentina/Cabo Verde
