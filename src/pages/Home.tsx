import { useState, useRef } from 'react';

import { Box, Container, Grid, Typography } from '@mui/material';

import { SearchBar } from '../components/SearchBar/SearchBar';
import { SearchResults } from '../components/SearchResults/SearchResults';
import { RecommendationTemplate } from '../components/RecommendationTemplate/RecommendationTemplate';

import { useGameSearch } from '../hooks/useGameSearch';
import { useDebounce } from '../hooks/useDebounce';

import type { RecommendationSlots, SlotId } from '../types/recommendation';
import type { Game } from '../types/game';
import { AddGameModal } from '../components/AddGameModal/AddGameModal';
import { DeleteGameModal } from '../components/DeleteGameModal/DeleteGameModal';
import { toPng } from 'html-to-image';
import { ExportImage } from '../components/ExportImage/ExportImage';

export const Home = () => {
  const INITIAL_SLOTS: RecommendationSlots = {
    slot1: null,
    slot2: null,
    slot3: null,
    slot4: null,
    slot5: null,
  };

  const templateRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState('');
  const [slots, setSlots] = useState(INITIAL_SLOTS);
  const [draggedSlot, setDraggedSlot] = useState<SlotId | null>(null);
  const [title, setTitle] = useState('Mis 5 Preferidos');

  const [featuredComment, setFeaturedComment] = useState('');

  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [gameToDelete, setGameToDelete] = useState<Game | null>(null);

  const [slotToDelete, setSlotToDelete] = useState<
    keyof RecommendationSlots | null
  >(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const debouncedSearch = useDebounce(search);
  const { data: games = [], isLoading } = useGameSearch(debouncedSearch);

  const exportImage = async () => {
    if (!exportRef.current) {
      return;
    }

    try {
      const dataUrl = await toPng(exportRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });

      const link = document.createElement('a');

      link.download = `${title || 'my-5-games'}.png`;

      link.href = dataUrl;

      link.click();
    } catch (error) {
      console.error(error);
    }
  };

  const isTemplateComplete =
    Object.values(slots).every((slot) => slot !== null) &&
    title.trim().length > 0;

  const handleGameClick = (game: Game) => {
    setSelectedGame(game);
    setIsAddModalOpen(true);
  };

  const handleConfirmAddGame = () => {
    if (!selectedGame) {
      return;
    }

    const alreadySelected = Object.values(slots).some(
      (game) => game?.id === selectedGame.id,
    );

    if (alreadySelected) {
      setIsAddModalOpen(false);
      return;
    }

    const emptySlot = Object.entries(slots).find(
      ([_, value]) => value === null,
    )?.[0];

    if (!emptySlot) {
      return;
    }

    setSlots((previous) => ({
      ...previous,
      [emptySlot]: selectedGame,
    }));

    setSelectedGame(null);
    setIsAddModalOpen(false);
  };

  const hasEmptySlot = Object.values(slots).some((slot) => slot === null);

  const handleDeleteRequest = (
    slotKey: keyof RecommendationSlots,
    game: Game,
  ) => {
    setSlotToDelete(slotKey);
    setGameToDelete(game);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!slotToDelete) {
      return;
    }

    setSlots((previous) => ({
      ...previous,
      [slotToDelete]: null,
    }));

    setGameToDelete(null);
    setSlotToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const moveGame = (fromSlot: SlotId, toSlot: SlotId) => {
    if (fromSlot === toSlot) {
      return;
    }

    setSlots((previous) => {
      const sourceGame = previous[fromSlot];

      const destinationGame = previous[toSlot];

      return {
        ...previous,
        [fromSlot]: destinationGame,
        [toSlot]: sourceGame,
      };
    });

    if (fromSlot === 'slot5' || toSlot === 'slot5') {
      setFeaturedComment('');
    }
  };

  return (
    <Container
      maxWidth='lg'
      sx={{
        height: {xs: 'auto', md: "100vh"},
        display: 'flex',
        flexDirection: 'column',
        py: 2,
        backgroundColor: '#FAFAFA',
        color: '#000000',
      }}
    >
      <Typography
        variant='h5'
        sx={{
          fontWeight: 600,
          mb: 2,
        }}
      >
        Elegí cinco juegos y armá tu lista personalizada
      </Typography>

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
        }}
      >
        <Grid
          container
          spacing={4}
          sx={{
            height: '100%',
          }}
        >
          <Grid
            size={{ xs: 12, md: 5 }}
            sx={{
              height: '100%',
            }}
          >
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <SearchBar value={search} onChange={setSearch} />

              <Box
                sx={{
                  flex: 1,
                  minHeight: 0,
                  overflowY: 'auto',
                  mt: 2,
                  pr: 1,
                }}
              >
                <SearchResults
                  games={games}
                  isLoading={isLoading}
                  searchTerm={debouncedSearch}
                  onGameSelect={handleGameClick}
                />
              </Box>
            </Box>
          </Grid>

          <Grid
            size={{ xs: 12, md: 7 }}
            sx={{
              height: '100%',
            }}
          >
            <RecommendationTemplate
              ref={templateRef}
              slots={slots}
              onGenerate={exportImage}
              canGenerate={isTemplateComplete}
              onDeleteRequest={handleDeleteRequest}
              title={title}
              onTitleChange={setTitle}
              featuredComment={featuredComment}
              onFeaturedCommentChange={setFeaturedComment}
              draggedSlot={draggedSlot}
              onDragStart={setDraggedSlot}
              onMoveGame={moveGame}
            />
          </Grid>
        </Grid>
      </Box>

      <AddGameModal
        open={isAddModalOpen}
        game={selectedGame}
        hasEmptySlot={hasEmptySlot}
        onClose={() => {
          setSelectedGame(null);
          setIsAddModalOpen(false);
        }}
        onConfirm={handleConfirmAddGame}
      />
      <DeleteGameModal
        open={isDeleteModalOpen}
        game={gameToDelete}
        onClose={() => {
          setGameToDelete(null);
          setSlotToDelete(null);
          setIsDeleteModalOpen(false);
        }}
        onConfirm={handleConfirmDelete}
      />

      <Box
        sx={{
          position: 'fixed',
          left: '-99999px',
          top: 0,
        }}
      >
        <div ref={exportRef}>
          <ExportImage
            title={title}
            slots={slots}
            featuredComment={featuredComment}
          />
        </div>
      </Box>
    </Container>
  );
};
