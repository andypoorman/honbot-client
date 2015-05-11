'use strict';

var largeHero = ["Andromeda_store_hero", "Andromeda_store_alt", "Andromeda_store_alt2", "Andromeda_store_alt4", "Artillery_store_hero", "Artillery_store_alt", "Artillery_store_alt2", "Artillery_store_alt3", "Artillery_store_alt4", "Blitz_store_hero", "Blitz_store_alt", "Blitz_store_alt2", "Draconis_store_hero", "Draconis_store_alt", "Draconis_store_alt2", "Draconis_store_alt3", "Draconis_store_alt4", "Draconis_store_alt5", "Emerald+Warden_store_hero", "Emerald+Warden_store_alt", "Emerald+Warden_store_alt2", "Emerald+Warden_store_alt3", "Emerald+Warden_store_alt4", "Emerald+Warden_store_alt5", "Engineer_store_hero", "Engineer_store_alt", "Engineer_store_alt2", "Engineer_store_alt3", "Engineer_store_alt4", "Engineer_store_alt5", "Magebane_store_hero", "Magebane_store_alt", "Magebane_store_alt2", "Magebane_store_alt4", "Magebane_store_alt5", "Master+Of+Arms_store_hero", "Master+Of+Arms_store_alt", "Master+Of+Arms_store_alt2", "Master+Of+Arms_store_alt3", "Master+Of+Arms_store_alt4", "Master+Of+Arms_store_alt5", "Moira_store_hero", "Moira_store_alt", "Monkey+King_store_hero", "Monkey+King_store_alt", "Monkey+King_store_alt2", "Monkey+King_store_alt3", "Monkey+King_store_alt4", "Monkey+King_store_alt5", "Monkey+King_store_alt6", "Monkey+King_store_alt7", "Moon+Queen_store_hero", "Moon+Queen_store_alt", "Moon+Queen_store_alt2", "Moon+Queen_store_alt3", "Moon+Queen_store_alt4", "Moon+Queen_store_alt5", "Moon+Queen_store_alt6", "Moon+Queen_store_alt7", "Night+Hound_store_hero", "Night+Hound_store_alt", "Night+Hound_store_alt2", "Night+Hound_store_alt3", "Night+Hound_store_alt4", "Night+Hound_store_alt5", "Nomad_store_hero", "Nomad_store_alt2", "Nomad_store_alt3", "Nomad_store_alt4", "Nomad_store_alt5", "Nomad_store_alt7", "Scout_store_hero", "Scout_store_alt", "Scout_store_alt2", "Scout_store_alt3", "Scout_store_alt4", "Scout_store_alt5", "Scout_store_alt6", "Scout_store_alt7", "Silhouette_store_hero", "Silhouette_store_alt", "Silhouette_store_alt2", "Silhouette_store_alt3", "Silhouette_store_alt4", "Silhouette_store_alt6", "Sir+Benzington_store_hero", "Sir+Benzington_store_alt", "Sir+Benzington_store_alt2", "Sir+Benzington_store_alt3", "Sir+Benzington_store_alt4", "Sir+Benzington_store_alt5", "Tarot_store_hero", "Tarot_store_alt", "Tarot_store_alt2", "Tarot_store_alt3", "Valkyrie_store_hero", "Valkyrie_store_alt", "Valkyrie_store_alt2", "Valkyrie_store_alt3", "Valkyrie_store_alt4", "Valkyrie_store_alt5", "Valkyrie_store_alt6", "Valkyrie_store_alt7", "Wildsoul_store_hero", "Wildsoul_store_alt", "Wildsoul_store_alt2", "Wildsoul_store_alt4", "Zephyr_store_hero", "Zephyr_store_alt", "Zephyr_store_alt2", "Zephyr_store_alt3", "Zephyr_store_alt4", "Zephyr_store_alt5", "Zephyr_store_alt6", "Zephyr_store_alt7", "Arachna_store_hero", "Arachna_store_alt", "Arachna_store_alt2", "Arachna_store_alt3", "Arachna_store_alt4", "Blood+Hunter_store_hero", "Blood+Hunter_store_alt", "Blood+Hunter_store_alt2", "Blood+Hunter_store_alt3", "Blood+Hunter_store_alt4", "Blood+Hunter_store_alt5", "Blood+Hunter_store_alt6", "Bushwack_store_hero", "Bushwack_store_alt", "Bushwack_store_alt2", "Calamity_store_hero", "Calamity_store_alt", "Chronos_store_hero", "Chronos_store_alt", "Chronos_store_alt2", "Chronos_store_alt3", "Chronos_store_alt4", "Chronos_store_alt5", "Corrupted+Disciple_store_hero", "Corrupted+Disciple_store_alt", "Corrupted+Disciple_store_alt2", "Corrupted+Disciple_store_alt3", "Corrupted+Disciple_store_alt4", "Dampeer_store_hero", "Dampeer_store_alt", "Dampeer_store_alt2", "Dampeer_store_alt3", "Dampeer_store_alt4", "Fayde_store_hero", "Fayde_store_alt", "Fayde_store_alt2", "Fayde_store_alt3", "Fayde_store_alt4", "Forsaken+Archer_store_hero", "Forsaken+Archer_store_alt", "Forsaken+Archer_store_alt2", "Forsaken+Archer_store_alt3", "Forsaken+Archer_store_alt4", "Gemini_store_hero", "Gemini_store_alt", "Gemini_store_alt2", "Gemini_store_alt3", "Grinex_store_hero", "Grinex_store_alt", "Grinex_store_alt2", "Grinex_store_alt3", "Grinex_store_alt4", "Gunblade_store_hero", "Gunblade_store_alt", "Gunblade_store_alt2", "Gunblade_store_alt3", "Gunblade_store_alt4", "Gunblade_store_alt5", "Gunblade_store_alt6", "Klanx_store_hero", "Klanx_store_alt", "Klanx_store_alt2", "Klanx_store_alt3", "Klanx_store_alt4", "Sand+Wraith_store_hero", "Sand+Wraith_store_alt", "Sand+Wraith_store_alt2", "Sand+Wraith_store_alt3", "Sand+Wraith_store_alt4", "Sand+Wraith_store_alt5", "Shadowblade_store_hero", "Shadowblade_store_alt", "Shadowblade_store_alt2", "Shadowblade_store_alt3", "Slither_store_hero", "Slither_store_alt", "Slither_store_alt2", "Slither_store_alt3", "Slither_store_alt4", "Slither_store_alt5", "Soulstealer_store_hero", "Soulstealer_store_alt", "Soulstealer_store_alt2", "Soulstealer_store_alt3", "Soulstealer_store_alt4", "The+Dark+Lady_store_hero", "The+Dark+Lady_store_alt", "The+Dark+Lady_store_alt2", "The+Dark+Lady_store_alt3", "The+Madman_store_hero", "The+Madman_store_alt", "The+Madman_store_alt2", "The+Madman_store_alt3", "Tremble_store_hero", "Tremble_store_alt", "Tremble_store_alt2", "Tremble_store_alt3", "Aluna_store_hero", "Aluna_store_alt", "Aluna_store_alt2", "Aluna_store_alt3", "Blacksmith_store_hero", "Blacksmith_store_alt", "Blacksmith_store_alt2", "Blacksmith_store_alt3", "Blacksmith_store_alt4", "Bombardier_store_hero", "Bombardier_store_alt", "Bombardier_store_alt2", "Bombardier_store_alt3", "Bombardier_store_alt4", "Bubbles_store_hero", "Bubbles_store_alt", "Bubbles_store_alt2", "Bubbles_store_alt3", "Bubbles_store_alt4", "Bubbles_store_alt6", "Bubbles_store_alt7", "Ellonia_store_hero", "Ellonia_store_alt", "Ellonia_store_alt2", "Ellonia_store_alt3", "Empath_store_hero", "Empath_store_alt", "Empath_store_alt2", "Empath_store_alt3", "Empath_store_alt4", "Kinesis_store_hero", "Kinesis_store_alt", "Kinesis_store_alt2", "Kinesis_store_alt3", "Martyr_store_hero", "Martyr_store_alt", "Martyr_store_alt2", "Martyr_store_alt4", "Martyr_store_alt5", "Monarch_store_hero", "Monarch_store_alt", "Monarch_store_alt2", "Monarch_store_alt3", "Monarch_store_alt5", "Nymphora_store_hero", "Nymphora_store_alt", "Nymphora_store_alt2", "Nymphora_store_alt3", "Oogie_store_hero", "Oogie_store_alt", "Oogie_store_alt2", "Ophelia_store_hero", "Ophelia_store_alt", "Ophelia_store_alt2", "Ophelia_store_alt3", "Ophelia_store_alt5", "Pearl_store_hero", "Pearl_store_alt", "Pearl_store_alt2", "Pearl_store_alt3", "Pearl_store_alt4", "Pearl_store_alt5", "Pollywog+Priest_store_hero", "Pollywog+Priest_store_alt", "Pollywog+Priest_store_alt2", "Pollywog+Priest_store_alt3", "Pollywog+Priest_store_alt4", "Pyromancer_store_hero", "Pyromancer_store_alt", "Pyromancer_store_alt2", "Pyromancer_store_alt3", "Pyromancer_store_alt4", "Rhapsody_store_hero", "Rhapsody_store_alt", "Rhapsody_store_alt2", "Rhapsody_store_alt3", "Tempest_store_hero", "Tempest_store_alt", "Tempest_store_alt2", "Tempest_store_alt3", "The+Chipper_store_hero", "The+Chipper_store_alt", "The+Chipper_store_alt2", "The+Chipper_store_alt4", "Thunderbringer_store_hero", "Thunderbringer_store_alt", "Thunderbringer_store_alt2", "Thunderbringer_store_alt4", "Vindicator_store_hero", "Vindicator_store_alt", "Vindicator_store_alt2", "Vindicator_store_alt3", "Vindicator_store_alt4", "Witch+Slayer_store_hero", "Witch+Slayer_store_alt", "Witch+Slayer_store_alt2", "Witch+Slayer_store_alt3", "Witch+Slayer_store_alt4", "Witch+Slayer_store_alt5", "Artesia_store_hero", "Artesia_store_alt", "Artesia_store_alt2", "Circe_store_hero", "Circe_store_alt", "Circe_store_alt2", "Circe_store_alt3", "Defiler_store_hero", "Defiler_store_alt", "Defiler_store_alt2", "Defiler_store_alt3", "Demented+Shaman_store_hero", "Demented+Shaman_store_alt", "Demented+Shaman_store_alt2", "Demented+Shaman_store_alt3", "Demented+Shaman_store_alt4", "Doctor+Repulsor_store_hero", "Doctor+Repulsor_store_alt", "Doctor+Repulsor_store_alt2", "Doctor+Repulsor_store_alt3", "Doctor+Repulsor_store_alt4", "Geomancer_store_hero", "Geomancer_store_alt", "Geomancer_store_alt2", "Geomancer_store_alt3", "Geomancer_store_alt4", "Geomancer_store_alt5", "Glacius_store_hero", "Glacius_store_alt", "Glacius_store_alt2", "Glacius_store_alt3", "Glacius_store_alt5", "Gravekeeper_store_hero", "Gravekeeper_store_alt", "Gravekeeper_store_alt2", "Gravekeeper_store_alt3", "Hellbringer_store_hero", "Hellbringer_store_alt", "Hellbringer_store_alt2", "Hellbringer_store_alt3", "Hellbringer_store_alt4", "Myrmidon_store_hero", "Myrmidon_store_alt", "Myrmidon_store_alt2", "Myrmidon_store_alt3", "Parallax_store_hero", "Parallax_store_alt", "Parasite_store_hero", "Parasite_store_alt", "Parasite_store_alt2", "Parasite_store_alt3", "Parasite_store_alt4", "Plague+Rider_store_hero", "Plague+Rider_store_alt", "Plague+Rider_store_alt2", "Plague+Rider_store_alt4", "Prophet_store_hero", "Prophet_store_alt", "Prophet_store_alt2", "Prophet_store_alt3", "Prophet_store_alt4", "Puppet+Master_store_hero", "Puppet+Master_store_alt", "Puppet+Master_store_alt2", "Puppet+Master_store_alt3", "Puppet+Master_store_alt4", "Puppet+Master_store_alt5", "Puppet+Master_store_alt6", "Revenant_store_hero", "Revenant_store_alt", "Revenant_store_alt2", "Riftwalker_store_hero", "Riftwalker_store_alt", "Riftwalker_store_alt2", "Soul+Reaper_store_hero", "Soul+Reaper_store_alt", "Soul+Reaper_store_alt2", "Soul+Reaper_store_alt3", "Succubus_store_hero", "Succubus_store_alt", "Succubus_store_alt2", "Succubus_store_alt3", "Succubus_store_alt5", "Succubus_store_alt6", "Torturer_store_hero", "Torturer_store_alt", "Torturer_store_alt2", "Torturer_store_alt3", "Voodoo+Jester_store_hero", "Voodoo+Jester_store_alt", "Voodoo+Jester_store_alt2", "Voodoo+Jester_store_alt3", "Wretched+Hag_store_hero", "Wretched+Hag_store_alt", "Wretched+Hag_store_alt2", "Wretched+Hag_store_alt3", "Wretched+Hag_store_alt4", "Wretched+Hag_store_alt5", "Wretched+Hag_store_alt6", "Accursed_store_hero", "Accursed_store_alt", "Accursed_store_alt2", "Accursed_store_alt4", "Accursed_store_alt6", "Amun-Ra_store_hero", "Amun-Ra_store_alt", "Amun-Ra_store_alt2", "Amun-Ra_store_alt3", "Amun-Ra_store_alt4", "Balphagore_store_hero", "Balphagore_store_alt", "Balphagore_store_alt2", "Balphagore_store_alt3", "Cthulhuphant_store_hero", "Cthulhuphant_store_alt", "Cthulhuphant_store_alt2", "Cthulhuphant_store_alt3", "Deadlift_store_hero", "Deadlift_store_alt", "Deadwood_store_hero", "Deadwood_store_alt", "Deadwood_store_alt2", "Deadwood_store_alt3", "Deadwood_store_alt4", "Deadwood_store_alt5", "Deadwood_store_alt6", "Devourer_store_hero", "Devourer_store_alt", "Electrician_store_hero", "Electrician_store_alt", "Electrician_store_alt2", "Electrician_store_alt4", "Gauntlet_store_hero", "Gauntlet_store_alt", "Gauntlet_store_alt2", "Gauntlet_store_alt3", "Gauntlet_store_alt4", "Gauntlet_store_alt5", "Kane_store_hero", "Kane_store_alt", "Kane_store_alt2", "Kraken_store_hero", "Kraken_store_alt", "Kraken_store_alt2", "Kraken_store_alt3", "Lodestone_store_hero", "Lodestone_store_alt", "Lodestone_store_alt2", "Lodestone_store_alt3", "Lord+Salforis_store_hero", "Lord+Salforis_store_alt", "Lord+Salforis_store_alt2", "Lord+Salforis_store_alt3", "Lord+Salforis_store_alt4", "Magmus_store_hero", "Magmus_store_alt", "Magmus_store_alt2", "Magmus_store_alt3", "Magmus_store_alt4", "Magmus_store_alt5", "Magmus_store_alt6", "Maliken_store_hero", "Maliken_store_alt", "Maliken_store_alt2", "Maliken_store_alt4", "Maliken_store_alt5", "Moraxus_store_hero", "Moraxus_store_alt", "Moraxus_store_alt2", "Moraxus_store_alt3", "Pestilence_store_hero", "Pestilence_store_alt2", "Pestilence_store_alt3", "Pharaoh_store_hero", "Pharaoh_store_alt", "Pharaoh_store_alt2", "Pharaoh_store_alt3", "Pharaoh_store_alt4", "Pharaoh_store_alt5", "Ravenor_store_hero", "Ravenor_store_alt", "Ravenor_store_alt2", "Ravenor_store_alt3", "Ravenor_store_alt4", "Ravenor_store_alt5", "Riptide_store_hero", "Riptide_store_alt", "Riptide_store_alt2", "Riptide_store_alt3", "War+Beast_store_hero", "War+Beast_store_alt", "War+Beast_store_alt2", "War+Beast_store_alt4", "Armadon_store_hero", "Armadon_store_alt", "Armadon_store_alt2", "Armadon_store_alt3", "Armadon_store_alt4", "Armadon_store_alt5", "Armadon_store_alt6", "Behemoth_store_hero", "Behemoth_store_alt", "Behemoth_store_alt2", "Behemoth_store_alt3", "Behemoth_store_alt4", "Behemoth_store_alt5", "Berzerker_store_hero", "Berzerker_store_alt", "Berzerker_store_alt2", "Berzerker_store_alt3", "Berzerker_store_alt4", "Berzerker_store_alt5", "Bramble_store_hero", "Bramble_store_alt", "Bramble_store_alt2", "Bramble_store_alt3", "Bramble_store_alt4", "Bramble_store_alt5", "Drunken+Master_store_hero", "Drunken+Master_store_alt", "Drunken+Master_store_alt3", "Drunken+Master_store_alt4", "Drunken+Master_store_alt5", "Drunken+Master_store_alt7", "Flux_store_hero", "Flux_store_alt", "Flux_store_alt2", "Flux_store_alt3", "Hammerstorm_store_hero", "Hammerstorm_store_alt", "Hammerstorm_store_alt2", "Hammerstorm_store_alt4", "Hammerstorm_store_alt5", "Jeraziah_store_hero", "Jeraziah_store_alt", "Jeraziah_store_alt2", "Jeraziah_store_alt3", "Jeraziah_store_alt4", "Jeraziah_store_alt5", "Keeper+of+the+Forest_store_alt", "Keeper+of+the+Forest_store_alt2", "Keeper+of+the+Forest_store_alt3", "Keeper+of+the+Forest_store_alt5", "Midas_store_hero", "Midas_store_alt", "Midas_store_alt2", "Midas_store_alt3", "Midas_store_alt4", "Pandamonium_store_hero", "Pandamonium_store_alt", "Pandamonium_store_alt2", "Pandamonium_store_alt3", "Pandamonium_store_alt4", "Pandamonium_store_alt5", "Pandamonium_store_alt6", "Pebbles_store_hero", "Pebbles_store_alt", "Pebbles_store_alt2", "Pebbles_store_alt3", "Pebbles_store_alt5", "Predator_store_hero", "Predator_store_alt", "Predator_store_alt2", "Predator_store_alt3", "Predator_store_alt4", "Predator_store_alt5", "Predator_store_alt7", "Prisoner+945_store_hero", "Prisoner+945_store_alt3", "Prisoner+945_store_alt4", "Rally_store_hero", "Rally_store_alt", "Rally_store_alt2", "Rally_store_alt3", "Rally_store_alt4", "Rally_store_alt5", "Salomon_store_hero", "Salomon_store_alt", "Salomon_store_alt2", "Salomon_store_alt3", "Solstice_store_hero", "Solstice_store_alt", "Solstice_store_alt2", "Solstice_store_alt3", "Solstice_store_alt4", "Solstice_store_alt5", "The+Gladiator_store_hero", "The+Gladiator_store_alt", "The+Gladiator_store_alt2", "The+Gladiator_store_alt3", "The+Gladiator_store_alt4", "The+Gladiator_store_alt6", "Tundra_store_hero", "Tundra_store_alt", "Tundra_store_alt2", "Tundra_store_alt3"];

export default largeHero;